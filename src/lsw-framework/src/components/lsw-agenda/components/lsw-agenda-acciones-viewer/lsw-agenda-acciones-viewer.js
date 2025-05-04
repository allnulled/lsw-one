// @code.start: LswAgendaAccionesViewer API | @$section: Vue.js (v2) Components » LswAgenda API » LswAgendaAccionesViewer API » LswAgendaAccionesViewer component
Vue.component("LswAgendaAccionesViewer", {
  name: "LswAgendaAccionesViewer",
  template: $template,
  props: {
    initialDate: {
      type: Date,
      required: true,
    },
    sorterStrategy: {
      type: String,
      default: () => false,
    }
  },
  data() {
    this.$trace("lsw-agenda-acciones-viewer.data");
    return {
      isLoading: true,
      selectedDate: this.initialDate,
      selectedAccion: "",
      selectedForm: false,
      selectedDateTasks: undefined,
      selectedDateTasksSorted: undefined,
      hiddenDateHours: [],
      shownAcciones: [],
    };
  },
  methods: {
    changeDate(selectedDate) {
      this.$trace("lsw-agenda-acciones-viewer.methods.changeDate");
      this.selectedDate = selectedDate;
      this.loadDateTasks();
    },
    selectForm(hora) {
      this.$trace("lsw-agenda-acciones-viewer.methods.selectForm");
      if (this.selectedForm === hora) {
        this.selectedForm = undefined;
      } else {
        this.selectedForm = hora;
      }
    },
    async onInsertTask(v, tarea) {
      this.$trace("lsw-agenda-acciones-viewer.methods.onInsertTask");
      const id = await this.$lsw.database.insert('Accion', v);
      this.selectForm(id);
      this.loadDateTasks();
    },
    async toggleAutogeneration(tarea) {
      this.$trace("lsw-agenda-acciones-viewer.methods.toggleAutogeneration");
      const siguientesParametros = (() => {
        if(tarea.tiene_parametros.startsWith("[*autogenerada]")) {
          return tarea.tiene_parametros.replace(/^\[\*autogenerada\] */g, "");
        }
        return "[*autogenerada] " + tarea.tiene_parametros;
      })();
      await this.$lsw.database.overwrite('Accion', tarea.id, {
        tiene_parametros: siguientesParametros
      });
      await this.loadDateTasks();
    },
    async advanceTaskState(tarea) {
      this.$trace("lsw-agenda-acciones-viewer.methods.advanceTaskState");
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
      await this.loadDateTasks();
    },
    toggleShowAccion(accionId) {
      this.$trace("lsw-agenda-acciones-viewer.methods.toggleShowAccion");
      const pos = this.shownAcciones.indexOf(accionId);
      if (pos === -1) {
        this.shownAcciones.push(accionId);
      } else {
        this.shownAcciones.splice(pos, 1);
      }
    },
    async loadDateTasks() {
      this.isLoading = true;
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
      Constitute_date_tasks_as_required: {
        if (this.sorterStrategy === false) {
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
        } else if (this.sorterStrategy === "despues") {
          this.selectedDateTasks = selectedDateTasks;
          const momentoActual = new Date();
          this.selectedDateTasksSorted = selectedDateTasks.filter(accion => {
            const dateInicio = LswTimer.utils.fromDatestringToDate(accion.tiene_inicio);
            try {
              return momentoActual <= dateInicio;
            } catch (error) {
              console.log(error);
              return false;
            }
          }).sort((accion1, accion2) => {
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
        } else if (this.sorterStrategy === "antes") {
          this.selectedDateTasks = selectedDateTasks;
          const momentoActual = new Date();
          this.selectedDateTasksSorted = selectedDateTasks.filter(accion => {
            const dateInicio = LswTimer.utils.fromDatestringToDate(accion.tiene_inicio);
            try {
              return momentoActual >= dateInicio;
            } catch (error) {
              console.log(error);
              return false;
            }
          }).sort((accion1, accion2) => {
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
              return 1;
            } else if (inicio1 > inicio2) {
              return -1;
            } else {
              return 1;
            }
          });
        }
      }
      this.isLoading = false;
    },
    showAllHours() {
      this.$trace("lsw-agenda-acciones-viewer.methods.showAllHours");
      this.hiddenDateHours = [];
    },
    hideAllHours() {
      this.$trace("lsw-agenda-acciones-viewer.methods.hideAllHours");
      this.hiddenDateHours = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
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
          if (isValid) {
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
      this.$trace("lsw-agenda-acciones-viewer.methods.cleanRandomizedDays");
      const currentDate = this.selectedDate || new Date();
      const filterAutogeneratedPendingOfCurrentDate = this.sameDayPendingAndAutogeneratedFilter(currentDate);
      const matchedAcciones = await this.$lsw.database.selectMany("Accion", filterAutogeneratedPendingOfCurrentDate);
      if (!matchedAcciones.length) {
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
      if (respuesta !== true) return;
      await this.$lsw.database.deleteMany("Accion", filterAutogeneratedPendingOfCurrentDate);
      await this.loadDateTasks(currentDate);
    },
    async randomizeDay() {
      this.$trace("lsw-agenda-acciones-viewer.methods.randomizeDay");
      const respuesta = await this.$dialogs.open({
        title: "Cuestionario de randomizar día",
        template: `<div>
            <div class="pad_1 pad_bottom_0">
                <div class="pad_1 pad_bottom_0">¿Qué duración quieres para las acciones de randomizado de día?</div>
                <div class="pad_1 pad_top_2 pad_bottom_0">
                    <lsw-duration-control ref="duracion" :settings="{name:'duracion',initialValue:'15min'}" :skip-label="true" />
                </div>
                <hr />
                <div class="pad_1 pad_bottom_0">¿Desde qué hora quieres randomizar? Mínimo: 0.</div>
                <div class="pad_1 pad_top_2 pad_bottom_0">
                    <lsw-text-control ref="hora_inicio" :settings="{name:'hora_inicio',initialValue:currentHour}" :skip-label="true" />
                </div>
                <hr />
                <div class="pad_1 pad_bottom_0">¿Hasta qué hora quieres randomizar? Máximo: 24</div>
                <div class="pad_1 pad_top_2 pad_bottom_0">
                    <lsw-text-control ref="hora_final" :settings="{name:'hora_final',initialValue:'24'}" :skip-label="true" />
                </div>
            </div>
            <div v-if="error">
                <hr/>
                <div class="box_error_container error_is_affecting_field" v-on:click="() => setError(false)">
                    <div class="box_error_content">{{ error.name }}: {{ error.message }}</div>
                </div>
            </div>
            <hr />
            <div class="text_align_right pad_right_1">
                <button class="supermini danger_button" v-on:click="submit">Randomizar día</button>
                <button class="supermini" v-on:click="cancel">Cancelar</button>
            </div>
        </div>`,
        factory: {
          data: {
            error: false,
            currentHour: (new Date()).getHours() + "",
          },
          methods: {
            setError(error) {
              this.error = error;
            },
            submit() {
              this.$trace("Dialogs.randomizar_dia.methos.submit");
              try {
                const valor = this.$refs.duracion.value;
                const ast = LswTimer.parser.parse(valor);
                const esValido = (valor.trim() !== "") && (typeof ast[0] === "object") && (ast[0].tipo === "Duracion");
                if (!esValido) return;
                this.value = {
                  duracion: valor,
                  hora_inicio: parseInt(this.$refs.hora_inicio.value),
                  hora_final: parseInt(this.$refs.hora_final.value),
                };
                if (this.value.hora_inicio < 0) {
                  throw new Error("Hora de inicio debe ser mayor que 0");
                }
                if (this.value.hora_inicio > 24) {
                  throw new Error("Hora de inicio debe ser menor o igual que 24");
                }
                if (this.value.hora_final < 0) {
                  throw new Error("Hora de final debe ser mayor que 0");
                }
                if (this.value.hora_final > 24) {
                  throw new Error("Hora de final debe ser menor o igual que 24");
                }
                return this.accept();
              } catch (error) {
                console.log(error);
                this.setError(error);
              }
            }
          }
        }
      });
      const {
        duracion: duracion_de_bloques,
        hora_inicio,
        hora_final
      } = respuesta;
      if (typeof duracion_de_bloques !== "string") return;
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
      const momentoInicio = new Date(this.selectedDate);
      Configurar_hora_de_inicio: {
        momentoInicio.setHours(hora_inicio);
        momentoInicio.setMinutes(0);
        momentoInicio.setSeconds(0);
        momentoInicio.setMilliseconds(0);
      }
      const momentoFinal = new Date(this.selectedDate);
      Configurar_hora_de_final: {
        momentoFinal.setHours(hora_final - 1);
        momentoFinal.setMinutes(0);
        momentoFinal.setSeconds(0);
        momentoFinal.setMilliseconds(0);
      }
      const randomizableRules = await this.$lsw.fs.evaluateAsDotenvFileOrReturn("/kernel/agenda/randomizables.env", {});
      const accionesAutogeneradas = LswAgendaRandomizer.generar(
        randomizableRules,
        accionesDelDia,
        momentoInicio,
        duracion_de_bloques,
        momentoFinal,
        0.2
      );
      accionesAutogeneradas.forEach(accion => {
        delete accion.id;
        accion.tiene_estado = "pendiente";
        accion.tiene_parametros = ("[*autogenerada] " + (accion.tiene_parametros.replace(/^\[\*autogenerada\]/g, ""))).trim();
      });
      Insertar_rows: {
        await this.$lsw.database.insertMany("Accion", accionesAutogeneradas);
        await this.loadDateTasks(this.selectedDate);
      }
    },
    async openDeleteTaskDialog(tarea, e) {
      this.$trace("lsw-agenda-acciones-viewer.methods.openDeleteTaskDialog");
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
      this.loadDateTasks();
    },
    async onUpdateTask(v, tarea) {
      this.$trace("lsw-agenda-acciones-viewer.methods.onUpdateTask");
      await this.$lsw.database.update('Accion', tarea.id, v);
      this.selectedForm = tarea.id;
      this.loadDateTasks();
    },
  },
  watch: {

  },
  async mounted() {
    try {
      this.$trace("lsw-agenda-acciones-viewer.mounted");
      await this.loadDateTasks();
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswAgendaAccionesViewer API