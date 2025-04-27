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
      isCalendarioSelected: false,
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
      shownAcciones: [],
    };
  },
  methods: {
    toggleShowAccion(accionId) {
      this.$trace("lsw-agenda.methods.toggleShowAccion");
      const pos = this.shownAcciones.indexOf(accionId);
      if (pos === -1) {
        this.shownAcciones.push(accionId);
      } else {
        this.shownAcciones.splice(pos, 1);
      }
    },
    selectAccion(accionId) {
      this.$trace("lsw-agenda.methods.selectAccion");
      if (this.selectedAccion === accionId) {
        this.selectedAccion = undefined;
      } else {
        this.selectedAccion = accionId;
      }
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
    async loadDateTasks(newDate, calendario, isOnMounted = false) {
      this.$trace("lsw-agenda.methods.loadDateTasks");
      // this.isLoading = true;
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
        if(isOnMounted) {
          const noTasksFound = (!this.selectedDateTasks) || (!this.selectedDateTasks.length);
          if(noTasksFound) {
            this.isCalendarioSelected = true;
          }
        }
        this.propagateDateTasks();
      } catch (error) {
        console.log("Error loading date taskes:", error);
      } finally {
        setTimeout(() => { this.isLoading = false }, 100);
      }
      await this.reloadCalendarioMarks(calendario);
      this.refreshTasks();
    },
    async reloadCalendarioMarks(calendario) {
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
      if(this.$refs.agenda_acciones_viewer) {
        this.$refs.agenda_acciones_viewer.changeDate(new Date(this.selectedDate));
      }
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
  },
  watch: {
  },
  async mounted() {
    try {
      this.$trace("lsw-agenda.mounted");
      const selectedDate = this.$refs.calendario.getValue();
      await this.loadDateTasks(selectedDate, undefined, true);
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswAgenda API
