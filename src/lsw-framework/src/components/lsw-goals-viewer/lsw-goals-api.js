(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswGoals'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswGoals'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  // @code.start: LswGoals class | @section: Lsw Goals API » LswGoals class

  const LocalUtilities = class {

  };

  const LswGoals = class {

    static async getGoalsReport() {
      Vue.prototype.$trace("lsw-goals-viewer.methods.getGoalsReport");
      try {
        const parsedLines = await Vue.prototype.$lsw.fs.evaluateAsDotenvListFileOrReturn("/kernel/settings/goals.env", []);
        // 1. Get original goals:
        const originalGoals = parsedLines.map(line => {
          const [concept, condition = "> 0", urgency = "0"] = line.split(/\|/g).map(item => {
            return item.trim();
          });
          return {
            originalLine: line,
            originalConcept: concept,
            originalCondition: condition,
            originalUrgency: urgency,
          };
        });
        // 2. Get today's completed actions:
        const todayCompletedActions = await this.getTodayActions(false, "completada");
        // 3. Expand goals:
        for (let indexGoal = 0; indexGoal < originalGoals.length; indexGoal++) {
          const originalGoal = originalGoals[indexGoal];
          const {
            originalConcept: concept,
            originalCondition: condition,
            originalUrgency: urgency
          } = originalGoal;
          const formattedConcept = this.formatConcept(concept);
          const formattedCondition = this.formatCondition(condition, formattedConcept);
          const formattedUrgency = this.formatUrgency(urgency);
          originalGoals[indexGoal].concept = formattedConcept;
          Object.assign(originalGoals[indexGoal], formattedCondition(todayCompletedActions));
          originalGoals[indexGoal].urgency = formattedUrgency;
        }
        const sortedGoals = [].concat(originalGoals).sort((g1, g2) => {
          const u1 = g1.urgency || 0;
          const u2 = g2.urgency || 0;
          const c1 = g1.filledAsint || 0;
          const c2 = g2.filledAsint || 0;
          const g1over = c1 > 100;
          const g2over = c2 > 100;
          if(g2over) return -1;
          if(g1over) return 1;
          if(u1 > u2) return -1;
          if(u1 < u2) return 1;
          if(c1 < c2) return -1;
          if(c1 > c2) return 1;
          return 0;
        });
        return {
          goals: sortedGoals,
          actions: todayCompletedActions
        };
      } catch (error) {
        console.error(error);
        return error;
      }
    }

    static formatConcept(txt) {
      return txt;
    }
    static formatCondition(originalTxt, concept) {
      const isMin = originalTxt.startsWith(">");
      const op = originalTxt.match(/(\<|\>)(=)?/g);
      const txt = originalTxt.replace(/(\<|\>)(=)?/g, "")
      const isTimes = this.isConditionByTimes(txt);
      const isDuration = this.isConditionByDuration(txt);
      if ((!isTimes) && (!isDuration)) {
        throw new Error(`Condition «${txt}» must be a number or a durationstring on «LswGoals.formatCondition»`);
      }
      const referenceValue = isTimes ? parseInt(txt) : LswTimer.utils.fromDurationstringToMilliseconds(txt);
      return completedActions => {
        const conclusion = {};
        conclusion.type = isTimes ? "by times" : isDuration ? "by duration" : undefined;
        conclusion.expectedAs = isMin ? "minimum" : "maximum";
        conclusion.expectedAsAbbr = isMin ? "min" : "max";
        const matchedActions = [];
        Collect_matched_actions:
        for (let index = 0; index < completedActions.length; index++) {
          const acc = completedActions[index];
          const sameConcept = acc.en_concepto === concept;
          const isCompleted = acc.tiene_estado === "completada"; // Redundante, pero bueno.
          if (sameConcept && isCompleted) {
            matchedActions.push(acc);
          }
        }
        Expand_data: {
          conclusion.currentTimes = matchedActions.length;
          conclusion.currentDurationInms = matchedActions.reduce((total, acc) => {
            try {
              total += LswTimer.utils.fromDurationstringToMilliseconds(acc.tiene_duracion || "0min");
            } catch (error) {
              console.log(error);
            }
            return total;
          }, 0);
          conclusion.currentDuration = LswTimer.utils.fromMillisecondsToDurationstring(conclusion.currentDurationInms) || "0min";
        }
        Apply_proper_filters: {
          if (isTimes) {
            const expectedTimes = referenceValue;
            conclusion.expectedTimes = expectedTimes;
            const evaluableSource = `${conclusion.currentTimes} ${op} ${expectedTimes}`;
            console.log("[*] Evaluating JavaScript for condition: ", evaluableSource);
            conclusion.filledAsint = Math.round(100 * (conclusion.currentTimes / conclusion.expectedTimes));
            conclusion.filled = conclusion.filledAsint + "%";
            conclusion.missingAsint = 100 - conclusion.filledAsint;
            conclusion.missing = conclusion.missingAsint + "%";
            conclusion.solved = window.eval(evaluableSource);
          } else if (isDuration) {
            const expectedDuration = referenceValue;
            conclusion.expectedDurationInms = expectedDuration;
            conclusion.expectedDuration = LswTimer.utils.fromMillisecondsToDurationstring(expectedDuration);
            const evaluableSource = `${conclusion.currentDurationInms} ${op} ${expectedDuration}`;
            console.log("[*] Evaluating JavaScript for condition: ", evaluableSource);
            conclusion.filledAsint = Math.round(100 * (conclusion.currentDurationInms / conclusion.expectedDurationInms));
            conclusion.filled = conclusion.filledAsint + "%";
            conclusion.missingAsint = 100 - conclusion.filledAsint;
            conclusion.missing = conclusion.missingAsint + "%";
            conclusion.solved = window.eval(evaluableSource);
          }
        }
        this.expandColor(conclusion);
        return conclusion;
      };
    }

    static COLOR = {
      SUSPENSO: "red",
      INSUFICIENTE: "pink",
      SUFICIENTE: "blue",
      NOTABLE: "orange",
      EXCELENTE: "yellow",
      SOBRESALIENTE: "lime",
    };

    static REVERSE_COLOR = {
      "red": "SUSPENSO",
      "pink": "INSUFICIENTE",
      "blue": "SUFICIENTE",
      "orange": "NOTABLE",
      "yellow": "EXCELENTE",
      "lime": "SOBRESALIENTE",
    };

    static expandColor(_) {
      const percentage = _.filledAsint;
      const asMin = _.expectedAs === "minimum" ? true : false;
      const assignedColor = (() => {
        if (percentage < 20) {
          return asMin ? this.COLOR.SUSPENSO : this.COLOR.SOBRESALIENTE;
        }
        else if (percentage < 40) {
          return asMin ? this.COLOR.INSUFICIENTE : this.COLOR.EXCELENTE;
        }
        else if (percentage < 60) {
          return asMin ? this.COLOR.SUFICIENTE : this.COLOR.NOTABLE;
        }
        else if (percentage < 80) {
          return asMin ? this.COLOR.NOTABLE : this.COLOR.SUFICIENTE;
        }
        else if (percentage < 100) {
          return asMin ? this.COLOR.EXCELENTE : this.COLOR.INSUFICIENTE;
        }
        else {
          return asMin ? this.COLOR.SOBRESALIENTE : this.COLOR.SUSPENSO;
        }
      })();
      Object.assign(_, {
        color: assignedColor,
        colorMeaning: this.REVERSE_COLOR[assignedColor],
      });
    }

    static formatUrgency(txt) {
      return parseFloat(txt.replace(/\!/g, "").trim());
    }

    static isConditionByTimes(txtVal) {
      return txtVal.trim().match(/^[0-9]+(\.[0-9]+)?$/g);
    }

    static isConditionByDuration(txtVal) {
      try {
        return LswTimer.utils.fromDurationstringToMilliseconds(txtVal);
        return true;
      } catch (error) {
        return false;
      }
    }

    static getTodayActions(concept = false, state = false) {
      Vue.prototype.$trace("lsw-goals-viewer.methods.getTodayActions");
      const dateToday = new Date();
      return Vue.prototype.$lsw.database.selectMany("Accion", acc => {
        const dateInicio = LswTimer.utils.fromDatestringToDate(acc.tiene_inicio);
        const isSameDay = LswTimer.utils.areSameDayDates(dateInicio, dateToday);
        if (!isSameDay) {
          return false;
        }
        if (concept) {
          const isSameConcept = acc.en_concepto === concept;
          if (!isSameConcept) {
            return false;
          }
        }
        if (state) {
          const isSameState = acc.tiene_estado === state;
          if (!isSameState) {
            return false;
          }
        }
        return true;
      });
    }

  };

  return LswGoals;

  // @code.end: LswGoals class

});