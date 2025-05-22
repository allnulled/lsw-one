// @code.start: LswGoalsViewer API | @$section: Vue.js (v2) Components » LswGoalsViewer component
Vue.component("LswGoalsViewer", {
  template: $template,
  props: {
    onClose: {
      type: [Function, Boolean],
      default: false,
    },
    onRefresh: {
      type: [Function, Boolean],
      default: false,
    },
    dayToAnalize: {
      type: [Boolean, Date],
      default: () => new Date(),
    }
  },
  data() {
    this.$trace("lsw-goals-viewer.data");
    const solverSymbols = ['👍', '✔️', '😃']
    const penderSymbols = ['🌵', '❌', '🥶'];
    const randomIndex = LswRandomizer.getRandomIntegerBetween(0, penderSymbols.length-1);
    return {
      isLoaded: false,
      isLoadingGoals: false,
      isFiltering: "none",
      isClicking: false,
      specifiedGoals: {},
      interestingFields: {
        "colorMeaning": "Estado actual",
        "filled": "Completado",
        "missing": "Faltante",
        "solved": "Resuelto",
        // "originalConcept": "Concepto",
        // "originalCondition": "Condición",
        // "originalUrgency": "Urgencia",
        "type": "Tipo",
        "expectedAs": "Formato",
        "expectedDuration": "Duración esperada",
        // "expectedAsAbbr": "Formato abreviado",
        "currentDuration": "Duración actual",
        "missingDuration": "Duración faltante",
        "expectedTimes": "Veces esperadas",
        "currentTimes": "Veces actuales",
        "missingTimes": "Veces faltantes",
        // "currentDurationInms": "Duración en ms actual",
        // "expectedDurationInms": "Duración esperada en ms",
        // "filledAsint": "Llenado como número",
        // "missingDurationInms": "Duración faltante en ms",
        // "missingAsint": "Faltante como número",
        // "solvable": "Resolvible",
        // "color": "color",
        // "urgency": "Urgencia"
        "originalLine": "Origen",
      },
      symbolForSolved: solverSymbols[randomIndex],
      symbolForPending: penderSymbols[randomIndex],
      selectedGoal: false,
      report: [],
      summary: false,
    };
  },
  methods: {
    async selectGoal(goal) {
      this.$trace("lsw-goals-viewer.methods.selectGoal");
      if(this.selectedGoal === goal) {
        this.selectedGoal = undefined;
      } else {
        this.selectedGoal = goal;
      }
      await this.loadGoalSpecification(goal);
    },
    selectFilter(id) {
      this.$trace("lsw-goals-viewer.methods.selectFilter");
      this.isFiltering = id;
    },
    async loadGoalSpecification(goal) {
      this.$trace("lsw-goals-viewer.methods.loadGoalSpecification");
      try {
        this.isLoadingGoals = true;
        const filepath = "/kernel/goals/todos/" + goal.concept + ".md";
        const filecontent = await this.$lsw.fs.read_file(filepath);
        const parsedContent = marked.parse(filecontent);
        this.specifiedGoals[goal.concept] = `<div class="markdown_texto">${parsedContent}</div>`;
        return parsedContent;
      } catch (error) {
        return false;
      } finally {
        this.isLoadingGoals = false;
      }
    },
    passesFilter(goal) {
      this.$trace("lsw-goals-viewer.methods.passesFilter");
      if(this.isFiltering === "none") {
        return true;
      } else if(this.isFiltering === "completed") {
        return goal.solved === true;
      } else {
        return goal.solved === false;
      }
    },
    async loadGoals() {
      this.$trace("lsw-goals-viewer.methods.loadGoals");
      this.isLoaded = false;
      this.report = await LswGoals.getGoalsReport(this.dayToAnalize);
      let resolved = 0;
      let failed = 0;

      for(let index=0; index<this.report.goals.length; index++) {
        const goal = this.report.goals[index];
        if(goal.solved) {
          resolved++;
        } else {
          failed++;
        }
      }
      this.summary = {
        total: this.report.goals.length,
        resolved,
        failed,
      };
      this.isLoaded = true;
    },
    openGoalsFile() {
      this.$trace("lsw-goals-viewer.methods.openGoalsFile");
      this.$dialogs.open({
        title: "Editar objetivos",
        template: `
          <div>
            <lsw-filesystem-explorer opened-by="/kernel/settings/goals.env" :absolute-layout="true" />
          </div>
        `
      });
    },
    openRecordsDirectory() {
      this.$trace("lsw-goals-viewer.methods.saveMoment");
      this.$dialogs.open({
        title: "Ver récords anteriores",
        template: `
          <div>
            <lsw-filesystem-explorer opened-by="/kernel/goals/records" :absolute-layout="true" />
          </div>
        `
      });
    },
    openRecordsViewer() {
      this.$trace("lsw-goals-viewer.methods.openRecordsViewer");
      this.$dialogs.open({
        title: "Visualizar récords",
        template: `
          <div class="pad_1">
            <lsw-goals-records-viewer />
          </div>
        `
      });
    },
    async saveMoment() {
      this.$trace("lsw-goals-viewer.methods.saveMoment");
      const dayUid = LswTimer.utils.fromDateToDatestring(new Date(), false, false, true).replace(/\/|\:/g, "-").replace(/ .*$/g, "");
      const filepath = "/kernel/goals/records/" + dayUid + ".json";
      const reportSnapshot = Object.assign({
        date: LswTimer.utils.fromDateToDatestring(this.dayToAnalize || new Date()),
      }, this.report, {});
      const filecontents = JSON.stringify(reportSnapshot, null, 2);
      await this.$lsw.fs.write_file(filepath, filecontents);
      this.$lsw.toasts.send({
        title: "Estadísticas del día guardadas",
        text: `En: ${filepath}`
      });
    },
    getAbbrvWord(id) {
      return id === "min" ? "🔺" : "🔻";
      return id === "min" ? "mínimo" : "máximo";
    },
    async editTodoOfGoal(goal) {
      this.$trace("lsw-goals-viewer.methods.editTodoOfGoal");
      const goalFilepath = `/kernel/goals/todos/${goal.concept}.md`;
      const exists = await this.$lsw.fs.exists(goalFilepath);
      if(!exists) {
        await this.$lsw.fs.write_file(goalFilepath, "");
      }
      this.$lsw.dialogs.open({
        title: "Detallando objetivo",
        template: `<lsw-filesystem-explorer :opened-by="goalFilepath" :absolute-layout="true" />`,
        factory: {
          data: { goal, goalFilepath },
          methods: { }
        }
      });
    }
  },
  watch: {},
  mounted() {
    this.$trace("lsw-goals-viewer.mounted");
    this.loadGoals();
  },
  unmounted() {
    this.$trace("lsw-goals-viewer.unmounted");
  }
});
// @code.end: LswGoalsViewer API