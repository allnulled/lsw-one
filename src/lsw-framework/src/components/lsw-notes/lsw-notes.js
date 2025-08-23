// @code.start: LswNotes API | @$section: Vue.js (v2) Components » Lsw SchemaBasedForm API » LswNotes component
Vue.component("LswNotes", {
  template: $template,
  props: {
    autoDialog: {
      type: Boolean,
      default: () => false,
    },
    onAutoDialogSuccess: {
      type: Function,
      default: () => {},
    },
    onAutoDialogError: {
      type: Function,
      default: () => {},
    }
  },
  data() {
    this.$trace("lsw-notes.data");
    return {
      isLoaded: false,
      allNotes: false,
      openedNotes: [],
      notasButtons: [{
        text: "➕",
        event: () => {
          this.openAddNoteDialog();
        }
      }],
      currentError: this.error,
    };
  },
  methods: {
    setError(error = undefined) {
      this.$trace("lsw-notes.methods.setError");
      this.currentError = error;
    },
    toggleNote(noteId) {
      this.$trace("lsw-notes.methods.toggleNote");
      const pos = this.openedNotes.indexOf(noteId);
      if(pos === -1) {
        this.openedNotes.push(noteId);
      } else {
        this.openedNotes.splice(pos, 1);
      }
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
    editNote(nota) {
      this.$trace("lsw-notes.methods.editNote");
      this.$lsw.dialogs.open({
        title: '💬 Editar nota',
        template: `
          <div>
            <lsw-schema-based-form
              :show-breadcrumb="false"
              :on-submit="(value) => submitCallback(value)"
              :on-delete-row="deleteCallback"
              :model="{
                  connection: $lsw.database,
                  databaseId: 'lsw_default_database',
                  tableId: 'Nota',
                  rowId: notaId,
              }"
            />
          </div>
        `,
        factory: {
          data: { notaId: nota.id },
          methods: {
            async submitCallback(value) {
              this.$trace("Dialogs.EditarArticulo.methods.submitCallback");
              try {
                await this.$lsw.database.update("Articulo", this.notaId, value);
                await this.$lsw.toasts.send({
                  title: "Artículo actualizado correctamente",
                  text: "El artículo ha sido actualizado con éxito."
                });
                this.close();
                notasComponent.loadArticulos();
              } catch (error) {
                console.log(error);
                await this.$lsw.toasts.send({
                  title: "Error al actualizar artículo",
                  text: "No se pudo actualizar el artículo por un error: " + error.message,
                  background: "red",
                });
              }
            },
            async deleteCallback() {
              this.$trace("Dialogs.EditarArticulo.methods.deleteCallback");
              this.close();
              notasComponent.loadArticulos();
              await this.$lsw.toasts.send({
                title: "Artículo eliminado correctamente",
                text: "El artículo se eliminó con éxito.",
              });
            }
          }
        }
      });
    },
    async openAddNoteDialog() {
      this.$trace("lsw-notes.methods.openAddNoteDialog");
      const response = await LswUtils.openAddNoteDialog();
      if(typeof response !== "object") {
        return;
      }
      await this.$lsw.database.insert("Nota", response);
      await this.loadNotes();
    }
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-notes.mounted");
      await this.loadNotes();
      if(this.autoDialog) {
        this.openAddNoteDialog();
      }
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswNotes API