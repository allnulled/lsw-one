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

  const GoalFactory = class {

    static validate(input) {
      Vue.prototype.$trace("Lsw.GoalFactory.getTodayActions");
    }

  }

  const LswGoals = class {

    static GoalFactory = GoalFactory;

    static async loadGoals() {
      Vue.prototype.$trace("LswGoals.loadGoals");
      const output = [];
      const errors = [];
      const factoryIds = await Vue.prototype.$lsw.fs.scan_directory("/kernel/settings/goals/factory");
      for (let indexFactory = 0; indexFactory < factoryIds.length; indexFactory++) {
        try {
          const factoryFilename = factoryIds[indexFactory];
          const factoryDefinition = await Vue.prototype.$lsw.fs.evaluateAsJavascriptFile(`/kernel/settings/goals/factory/${factoryFilename}`);
          GoalFactory.validate(factoryDefinition);
          output.push(factoryDefinition);
        } catch (error) {
          errors.push(error);
        }
      }
      if (errors.length) {
        throw errors;
      }
      return output;
    }

    static async getTodayActions() {
      Vue.prototype.$trace("LswGoals.getTodayActions");
      const errores = LswErrorHandler.createGroup();
      const allAcciones = await Vue.prototype.$lsw.database.selectMany("Accion");
      const todayAcciones = [];
      const todayDate = new Date();
      Iterando_acciones:
      for (let indexAccion = 0; indexAccion < allAcciones.length; indexAccion++) {
        const accion = allAcciones[indexAccion];
        if (!accion.tiene_inicio) {
          continue Iterando_acciones;
        }
        try {
          const accionDate = LswTimer.utils.fromDatestringToDate(accion.tiene_inicio);
          const sameDate = LswTimer.utils.areSameDayDates(todayDate, accionDate);
          if (sameDate) {
            todayAcciones.push(accion);
          }
        } catch (error) {
          errores.push(error);
        }
      }
      errores.selfThrowIfNeeded();
      return todayAcciones;
    }

    static async filterActionsByConcept(actions, conceptId) {
      Vue.prototype.$trace("LswGoals.filterActionsByConcept");
      const matchedActions = [];
      for (let indexAction = 0; indexAction < actions.length; indexAction++) {
        const action = actions[indexAction];
        const isMatch = action.en_concepto === conceptId;
        if (isMatch) {
          matchedActions.push(action);
        }
      }
      return matchedActions;
    }

    static async filterActionsByState(actions, stateId) {
      Vue.prototype.$trace("LswGoals.filterActionsByState");
      const matchedActions = [];
      for (let indexAction = 0; indexAction < actions.length; indexAction++) {
        const action = actions[indexAction];
        const isMatch = action.tiene_estado === stateId;
        if (isMatch) {
          matchedActions.push(action);
        }
      }
      return matchedActions;
    }

    static async ensureActionHasLimitedTimesToday(actionId, times, minOrMax = "min", options) {
      Vue.prototype.$trace("LswGoals.ensureActionHasLimitedTimesToday");
      try {
        const mensajeExplicativo = `${actionId} ${minOrMax === 'min' ? 'mínimo' : 'máximo'} ${times} veces hoy`;
        const {
          completado: completedMessage = `Sí está: ${mensajeExplicativo}`,
          fallido: notYetMessage = `Aún no está: ${mensajeExplicativo}`,
        } = options;
        const salida = input => Object.assign({
          id: mensajeExplicativo,
          urgencia: options.urgencia || 0,
        }, input);
        const todayActions = await LswGoals.getTodayActions();
        const matchedActions = await LswGoals.filterActionsByConcept(todayActions, actionId);
        const completedActions = await LswGoals.filterActionsByState(matchedActions, "completada");
        const isValid = (minOrMax === "min") ? completedActions.length < times : completedActions.length > times;
        if (isValid) {
          return salida({
            completadas: completedActions.length,
            mensaje: notYetMessage,
            porcentaje: Math.round((completedActions.length / times) * 100),
          });
        } else {
          return salida({
            mensaje: completedMessage,
            porcentaje: Math.round((completedActions.length / times) * 100),
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    static ensureActionHasMinimumTimesToday(actionId, minimumTimes, options) {
      return this.ensureActionHasLimitedTimesToday(actionId, minimumTimes, "min", options);
    }

    static ensureActionHasMaximumTimesToday(actionId, maximumTimes, options) {
      return this.ensureActionHasLimitedTimesToday(actionId, maximumTimes, "max", options);
    }

    static async ensureActionHasLimitedDurationToday(actionId, durationDatestring, minOrMax = "min", options = {}) {
      Vue.prototype.$trace("LswGoals.ensureActionHasLimitedDurationToday");
      try {
        const mensajeExplicativo = `${actionId} ${minOrMax === 'min' ? 'mínimo' : 'máximo'} ${durationDatestring} hoy`;
        const minimumDurationMs = LswTimer.utils.fromDurationstringToMilliseconds(durationDatestring);
        const {
          completado: completedMessage = `Sí está: ${mensajeExplicativo}`,
          fallido: notYetMessage = `Aún no está: ${mensajeExplicativo}`,
        } = options;
        const salida = input => Object.assign({
          id: mensajeExplicativo,
          urgencia: options.urgencia || 0,
        }, input);
        const todayActions = await LswGoals.getTodayActions();
        const matchedActions = await LswGoals.filterActionsByConcept(todayActions, actionId);
        const completedActions = await LswGoals.filterActionsByState(matchedActions, "completada");
        let currentDurationMs = 0;
        for (let indexActions = 0; indexActions < completedActions.length; indexActions++) {
          const action = completedActions[indexActions];
          try {
            const actionDurationMs = LswTimer.utils.fromDurationstringToMilliseconds(action.tiene_duracion);
            currentDurationMs += actionDurationMs;
          } catch (error) {
            // @BADLUCK.
          }
        }
        const currentTotal = LswTimer.utils.fromMillisecondsToDurationstring(currentDurationMs);
        const isValid = (minOrMax === "min") ? (currentDurationMs < minimumDurationMs) : (currentDurationMs > minimumDurationMs);
        if (isValid) {
          return salida({
            completadas: currentTotal,
            mensaje: notYetMessage,
            porcentaje: Math.round((currentDurationMs / minimumDurationMs) * 100),
          });
        } else {
          return salida({
            completadas: currentTotal,
            mensaje: completedMessage,
            porcentaje: Math.round((currentDurationMs / minimumDurationMs) * 100),
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    static ensureActionHasMinimumDurationToday(actionId, durationDatestring, options = {}) {
      return this.ensureActionHasLimitedDurationToday(actionId, durationDatestring, "min", options);
    }

    static ensureActionHasMaximumDurationToday(actionId, durationDatestring, options = {}) {
      return this.ensureActionHasLimitedDurationToday(actionId, durationDatestring, "max", options);
    }

  };

  return LswGoals;

  // @code.end: LswGoals class

});