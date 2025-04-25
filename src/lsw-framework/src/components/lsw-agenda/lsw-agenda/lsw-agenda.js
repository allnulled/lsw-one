// @code.start: LswAgenda API | @$section: Vue.js (v2) Components » LswAgenda API » LswAgenda API » LswAgenda component
Vue.component("LswAgenda", {
  name: "LswAgenda",
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda.data");
    return {
      counter: 0,
      isLoading: false,
      isCalendarioSelected: true,
      hasPsicodelia: true,
      selectedAccion: undefined,
      selectedContext: "agenda",
      selectedSubmenu1: 'calendario',
      selectedDate: undefined,
      selectedDateTasks: undefined,
      selectedDateTasksSorted: undefined,
      selectedDateTasksFormattedPerHour: undefined,
      selectedForm: undefined,
      hiddenDateHours: [],
    };
  },
  methods: {
    selectAccion(accionId) {
      this.$trace("lsw-agenda.methods.selectAccion");
      if(this.selectedAccion === accionId) {
        this.selectedAccion = undefined;
      } else {
        this.selectedAccion = accionId;
      }
    },
    showAllHours() {
      this.$trace("lsw-agenda.methods.showAllHours");
      this.hiddenDateHours = [];
    },
    hideAllHours() {
      this.$trace("lsw-agenda.methods.hideAllHours");
      this.hiddenDateHours = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    },
    selectContext(id, parameters = {}) {
      this.$trace("lsw-agenda.methods.selectContext");
      this.selectedSubmenu1 = "none";
      this.selectedContextParameters = parameters;
      this.selectedContext = id;
    },
    selectSubmenu1(id) {
      this.$trace("lsw-agenda.methods.selectSubmenu1");
      this.selectedSubmenu1 = id;
    },
    toggleCalendario() {
      this.$trace("lsw-agenda.methods.toggleCalendario");
      const finalState = !this.isCalendarioSelected;
      if (this.selectedContext !== "agenda") {
        this.selectContext("agenda");
        this.isCalendarioSelected = true;
        return;
      } else if (finalState) {
        // OK.
      }
      this.isCalendarioSelected = finalState;
    },
    togglePsicodelia() {
      this.$trace("lsw-agenda.methods.togglePsicodelia");
      this.hasPsicodelia = !this.hasPsicodelia;
    },
    toggleHour(hourInt) {
      this.$trace("lsw-agenda.methods.toggleHour");
      const pos = this.hiddenDateHours.indexOf(hourInt);
      if (pos === -1) {
        this.hiddenDateHours.push(hourInt);
      } else {
        this.hiddenDateHours.splice(pos, 1);
      }
    },
    async loadDateTasks(newDate, calendario) {
      this.$trace("lsw-agenda.methods.loadDateTasks");
      this.isLoading = true;
      console.log("[*] Loading date tasks of: " + LswTimer.utils.fromDateToDatestring(newDate));
      try {
        this.selectedDate = newDate;
        const selectedDate = this.selectedDate;
        const selectedDateTasks = await this.$lsw.database.selectMany("Accion", valueBrute => {
          try {
            const valueList = LswTimer.parser.parse(valueBrute.tiene_inicio);
            const value = valueList[0];
            const isSameYear = value.anio === selectedDate.getFullYear();
            const isSameMonth = value.mes === (selectedDate.getMonth() + 1);
            const isSameDay = value.dia === selectedDate.getDate();
            const isAccepted = isSameYear && isSameMonth && isSameDay;
            return isAccepted;
          } catch (error) {
            return true;
          }
        });
        this.selectedDateTasks = selectedDateTasks;
        this.selectedDateTasksSorted = selectedDateTasks.sort((accion1, accion2) => {
          let inicio1 = undefined;
          let inicio2 = undefined;
          try {
            inicio1 = LswTimer.utils.fromDatestringToDate(accion1.tiene_inicio);
          } catch (error) {
            return 1;
          }
          try {
            inicio2 = LswTimer.utils.fromDatestringToDate(accion2.tiene_inicio);
          } catch (error) {
            return -1;
          }
          if (inicio1 < inicio2) {
            return -1;
          } else if (inicio1 > inicio2) {
            return 1;
          } else {
            return -1;
          }
        });
        this.propagateDateTasks();
      } catch (error) {
        console.log("Error loading date taskes:", error);
      } finally {
        setTimeout(() => { this.isLoading = false }, 100);
      }
      if (calendario) {
        const selectedDate = this.selectedDate;
        const tasksOfMonth = await this.$lsw.database.selectMany("Accion", valueBrute => {
          const valueList = LswTimer.parser.parse(valueBrute.tiene_inicio);
          const value = valueList[0];
          const isSameYear = value.anio === selectedDate.getFullYear();
          const isSameMonth = value.mes === (selectedDate.getMonth() + 1);
          const isAccepted = isSameYear && isSameMonth;
          return isAccepted;
        });
        const tasksOfMonthByDay = tasksOfMonth.reduce((out, item) => {
          const valueList = LswTimer.parser.parse(item.tiene_inicio);
          const value = valueList[0];
          const day = value.dia;
          if (!(day in out)) {
            out[day] = [];
          }
          out[day].push(item);
          return out;
        }, {});
        calendario.establecer_marcadores_del_mes(tasksOfMonthByDay);
      }
    },
    groupTasksByHour(tareas = this.selectedDateTasks) {
      this.$trace("lsw-agenda.methods.groupTasksByHour");
      const mapaHoras = {};
      Agrupacion_inicial:
      for (let i = 0; i < tareas.length; i++) {
        const tarea = tareas[i];
        const { tiene_inicio } = tarea;
        const [inicioObject] = LswTimer.parser.parse(tiene_inicio);
        const { hora, minuto } = inicioObject;
        if (typeof hora !== "number") {
          continue Agrupacion_inicial;
        }
        if (!(hora in mapaHoras)) {
          mapaHoras[hora] = [];
        }
        mapaHoras[hora].push(tarea);
      }
      //return mapaHoras;
      const segunHoras = [];
      Formateo_final:
      for (let hora in mapaHoras) {
        const lista = mapaHoras[hora];
        segunHoras.push({
          hora,
          tareas: lista,
        });
      }
      return segunHoras;
    },
    propagateDateTasks() {
      this.$trace("lsw-agenda.methods.propagateDateTasks");
      this.selectedDateTasksFormattedPerHour = this.groupTasksByHour();
    },
    async openInsertTaskDialog() {
      this.$trace("lsw-agenda.methods.openInsertTaskDialog");
      // *@TODO: 
    },
    async openDeleteTaskDialog(tarea, e) {
      this.$trace("lsw-agenda.methods.openDeleteTaskDialog");
      const confirmed = await Vue.prototype.$dialogs.open({
        title: "Eliminar registro",
        template: `
          <div>
            <div class="pad_2">¿Seguro que quieres eliminar el registro?</div>
            <hr class="margin_0" />
            <div class="pad_2 text_align_right">
              <button class="supermini danger_button" v-on:click="() => accept(true)">Eliminar</button>
              <button class="supermini " v-on:click="() => accept(false)">Cancelar</button>
            </div>
          </div>
        `,
      });
      if (!confirmed) return false;
      await this.$lsw.database.delete("Accion", tarea.id);
      this.selectedForm = undefined;
      this.refreshTasks();
    },
    selectHour(hora) {
      this.$trace("lsw-agenda.methods.selectHour");
      if (this.selectedForm === hora) {
        this.selectedForm = undefined;
      } else {
        this.selectedForm = hora;
      }
    },
    async refreshTasks() {
      this.$trace("lsw-agenda.methods.refreshTasks");
      this.loadDateTasks(new Date(this.selectedDate));
    },
    async onUpdateTask(v, tarea) {
      this.$trace("lsw-agenda.methods.onUpdateTask");
      await this.$lsw.database.update('Accion', tarea.id, v);
      this.selectedForm = tarea.id;
      this.refreshTasks();
    },
    async onInsertTask(v, tarea) {
      this.$trace("lsw-agenda.methods.onInsertTask");
      const id = await this.$lsw.database.insert('Accion', v);
      this.selectedForm = id;
      this.refreshTasks();
    },
    async advanceTaskState(tarea) {
      this.$trace("lsw-agenda.methods.onInsertTask");
      const siguienteEstado = (() => {
        switch (tarea.tiene_estado) {
          case "pendiente": return "completada";
          case "completada": return "fallida";
          case "fallida": return "pendiente";
          default: return "pendiente";
        }
      })();
      await this.$lsw.database.overwrite('Accion', tarea.id, {
        tiene_estado: siguienteEstado
      });
      this.refreshTasks();
    },
    sameDayPendingAndAutogeneratedFilter(currentDate) {
      return (accion) => {
        try {
          const accionDate = LswTimer.utils.fromDatestringToDate(accion.tiene_inicio);
          const sameYear = currentDate.getFullYear() === accionDate.getFullYear();
          const sameMonth = currentDate.getMonth() === accionDate.getMonth();
          const sameDay = currentDate.getDate() === accionDate.getDate();
          const isPendiente = accion.tiene_estado === "pendiente";
          const isAutogenerated = accion.tiene_parametros.startsWith("[*autogenerada]");
          const isValid = sameYear && sameMonth && sameDay && isPendiente && isAutogenerated;
          if(isValid) {
            console.log("!!!", accion.en_concepto);
          } else {
            console.log("sameYear, sameMonth, sameDay, isPendiente");
            console.log("Fallo:", sameYear, sameMonth, sameDay, isPendiente, isAutogenerated);
          }
          return isValid;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
    },
    async cleanRandomizedDays() {
      this.$trace("lsw-agenda.methods.cleanRandomizedDays");
      const currentDate = this.selectedDate || new Date();
      const filterAutogeneratedPendingOfCurrentDate = this.sameDayPendingAndAutogeneratedFilter(currentDate);
      const matchedAcciones = await this.$lsw.database.selectMany("Accion", filterAutogeneratedPendingOfCurrentDate);
      if(!matchedAcciones.length) {
        return this.$lsw.toasts.send({
          title: "No hay acciones randomizadas",
          text: "Niniguna acción fue eliminada por ello."
        });
      }
      const respuesta = await this.$lsw.dialogs.open({
        title: "Eliminar registros randomizados",
        template: `<div>
          <div class="pad_1">
            <div>¿Estás seguro que quieres eliminar los registros randomizados?</div>
            <div>Se eliminarán {{ accionesToDelete.length }} registros de acciones randomizados de hoy.</div>
            <hr />
            <div class="flex_row pad_1">
              <div class="flex_100"></div>
              <div class="flex_1 pad_left_1">
                <button v-on:click="() => accept(true)" class="supermini danger_button">Eliminar</button>
              </div>
              <div class="flex_1 pad_left_1">
                <button v-on:click="cancel" class="supermini">Cancelar</button>
              </div>
            </div>
          </div>
        </div>`,
        factory: {
          data: {
            accionesToDelete: matchedAcciones
          }
        }
      });
      if(respuesta !== true) return;
      await this.$lsw.database.deleteMany("Accion", filterAutogeneratedPendingOfCurrentDate);
      await this.loadDateTasks(currentDate);
    },
    async randomizeDay() {
      this.$trace("lsw-agenda.methods.randomizeDay");
      const DURACION_DE_BLOQUES = await this.$dialogs.open({
        title: "Cuestionario de randomizar día",
        template: `<div>
          <div class="pad_1 pad_bottom_0">
            <div class="pad_1 pad_bottom_0">¿Con qué duración quieres las acciones de randomizado de día?</div>
            <div class="pad_1 pad_top_2 pad_bottom_0">
              <lsw-duration-control ref="duracion" :settings="{name:'duracion'}" :skip-label="true" :initial-value="'15min'" />
            </div>
          </div>
          <hr />
          <div class="text_align_right pad_right_1">
            <button class="supermini danger_button" v-on:click="submit">Randomizar día</button>
            <button class="supermini" v-on:click="cancel">Cancelar</button>
          </div>
        </div>`,
        factory: {
          methods: {
            submit() {
              this.$trace("Dialogs.randomizar_dia.methos.submit");
              const valor = this.$refs.duracion.value;
              const ast = LswTimer.parser.parse(valor);
              const esValido = (valor.trim() !== "") && (typeof ast[0] === "object") && (ast[0].tipo === "Duracion");
              if (!esValido) return;
              this.value = valor;
              return this.accept();
            }
          }
        }
      });
      if (typeof DURACION_DE_BLOQUES !== "string") return;
      const currentDate = this.selectedDate;
      const accionesDelDia = await this.$lsw.database.select("Accion", accion => {
        try {
          const accionDate = LswTimer.utils.fromDatestringToDate(accion.tiene_inicio);
          const sameYear = currentDate.getFullYear() === accionDate.getFullYear();
          const sameMonth = currentDate.getMonth() === accionDate.getMonth();
          const sameDay = currentDate.getDate() === accionDate.getDate();
          const isNotPendiente = accion.tiene_estado !== "pendiente";
          const isValid = sameYear && sameMonth && sameDay && isNotPendiente;
          return isValid;
        } catch (error) {
          console.log(error);
          return false;
        }
      });
      const horaInicio = new Date(this.selectedDate);
      const momentoAhora = new Date();
      if(horaInicio.getDate() === momentoAhora.getDate()) {
        horaInicio.setHours(momentoAhora.getHours());
      }
      horaInicio.setMinutes(0);
      horaInicio.setSeconds(0);
      horaInicio.setMilliseconds(0);
      const accionesAutogeneradas = LswAgendaRandomizer.generar(LswAgendaRandomizerReglas, accionesDelDia, horaInicio, DURACION_DE_BLOQUES);
      accionesAutogeneradas.forEach(accion => {
        delete accion.id;
        accion.tiene_estado = "pendiente";
        accion.tiene_parametros = ("[*autogenerada] " + (accion.tiene_parametros.replace(/^\[\*autogenerada\]/g, ""))).trim();
      });
      Insertar_rows: {
        await this.$lsw.database.insertMany("Accion", accionesAutogeneradas);
        await this.loadDateTasks(this.selectedDate);
      }
    }
  },
  watch: {
  },
  async mounted() {
    try {
      this.$trace("lsw-agenda.mounted");
      const selectedDate = this.$refs.calendario.getValue();
      this.loadDateTasks(selectedDate);
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswAgenda API
