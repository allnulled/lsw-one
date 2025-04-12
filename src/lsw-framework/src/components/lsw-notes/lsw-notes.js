// @code.start: LswNotes API | @$section: Vue.js (v2) Components » Lsw SchemaBasedForm API » LswNotes component
Vue.component("LswNotes", {
  template: $template,
  props: {
    
  },
  data() {
    this.$trace("lsw-notes.data");
    return {
      isLoaded: false,
      allNotes: false,
      currentError: this.error,
    };
  },
  methods: {
    setError(error = undefined) {
      this.$trace("lsw-notes.methods.setError");
      this.currentError = error;
    },
    async loadNotes() {
      this.$trace("lsw-notes.methods.loadNotes");
      // *@TODO: seleccionar e importar notes.
      this.isLoaded = false;
      const notes = await this.$lsw.database.selectMany("Nota");
      const notesSorted = notes.sort((n1, n2) => {
        const d1 = LswTimer.utils.getDateFromMomentoText(n1.tiene_fecha);
        const d2 = LswTimer.utils.getDateFromMomentoText(n2.tiene_fecha);
        if(d1 >= d2) return -1;
        return 1;
      });
      this.allNotes = notesSorted;
      this.isLoaded = true;
    },
    async openAddNoteDialog() {
      this.$trace("lsw-notes.methods.openAddNoteDialog");
      const response = await this.$lsw.dialogs.open({
        title: "Nueva nota",
        template: `<div class="pad_1 position_absolute top_0 right_0 left_0 bottom_0 flex_column">
          <div class="flex_1">
            <input class="width_100" type="text" v-model="value.tiene_fecha" placeholder="Fecha de la nota" ref="fecha" />
          </div>
          <div class="flex_1 flex_row centered" style="padding-top: 1px;">
            <div class="flex_1">Estado: </div>
            <select class="flex_100" v-model="value.tiene_estado">
              <option value="creada">Creada</option>
              <option value="procesada">Procesada</option>
              <option value="dudosa">Dudosa</option>
              <option value="desestimada">Desestimada</option>
            </select>
          </div>
          <div class="flex_1" style="padding-top: 2px;">
            <input class="width_100" type="text" v-model="value.tiene_categorias" placeholder="categoría 1; categoria 2; categoria 3" />
          </div>
          <div class="flex_100" style="padding-top: 1px;">
            <textarea v-focus v-model="value.tiene_contenido" spellcheck="false" style="height: 100%;" placeholder="Contenido de la nota. Acepta **markdown**, recuerda." ref="contenido" />
          </div>
          <div class="flex_1" style="padding-top: 2px;">
            <input class="width_100" type="text" v-model="value.tiene_titulo" placeholder="Título de la nota" ref="titulo" />
          </div>
          <div class="flex_row pad_top_1">
            <div class="flex_100"></div>
            <div class="flex_1 flex_row">
              <div class="pad_right_1">
                <button class="mini" v-on:click="validate">➕ Añadir</button>
              </div>
              <div>
                <button class="mini" v-on:click="cancel">❌ Cancelar</button>
              </div>
            </div>
          </div>
        </div>`,
        factory: {
          methods: {
            validate() {
              const isValidFecha = LswTimer.parser.parse(this.value.tiene_fecha);
              const isValidContenido = this.value.tiene_contenido.trim() !== "";
              const isValidTitulo = this.value.tiene_titulo.trim() !== "";
              if(!isValidTitulo) {
                window.alert("Necesita un título la nota.");
                return this.$refs.titulo.focus();
              }
              if(!isValidContenido) {
                window.alert("Necesita un contenido la nota.");
                return this.$refs.contenido.focus();
              }
              if(!isValidFecha) {
                window.alert("Necesita una fecha válida la nota.");
                return this.$refs.fecha.focus();
              }
              return this.accept();
            }
          },
          data: {
            value: {
              tiene_fecha: LswTimer.utils.formatDatestringFromDate(new Date(), false, false, true),
              tiene_titulo: "",
              tiene_categorias: "",
              tiene_contenido: "",
              tiene_estado: "creada", // "procesada"
            }
          }
        }
      });
      if(typeof response !== "object") return;
      await this.$lsw.database.insert("Nota", response);
      await this.loadNotes();
    }
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-notes.mounted");
      await this.loadNotes();
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswNotes API