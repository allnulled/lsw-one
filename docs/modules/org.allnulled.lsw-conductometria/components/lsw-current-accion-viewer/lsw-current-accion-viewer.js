// @code.start: LswCurrentAccionViewer API | @$section: Módulo org.allnulled.lsw-conductometria » Vue.js (v2) Components » LswCurrentAccionViewer API » LswCurrentAccionViewer component
Vue.component("LswCurrentAccionViewer", {
  template: $template,
  props: {
    
  },
  data() {
    this.$trace("lsw-current-accion-viewer.data");
    return {
      selectedSection: 'none', // 'antes', 'despues'
      accionesAntes: false,
      accionesDespues: false,
    };
  },
  methods: {
    selectSection(section) {
      this.$trace("lsw-current-accion-viewer.selectSection");
      if(this.selectedSection === section) {
        this.selectedSection = "none";
      } else {
        this.selectedSection = section;
      }
      if(["antes", "despues"].indexOf(section) !== -1) {
        this.loadAcciones();
      } else {
        this.$forceUpdate(true);
      }
    },
    async loadAcciones() {
      this.$trace("lsw-current-accion-viewer.loadAcciones");
      const output = await this.$lsw.database.selectMany("Accion");
      const estaHora = (() => {
        const d = new Date();
        d.setHours(0);
        return d;
      })();
      const accionesAntes = [];
      const accionesDespues = [];
      output.forEach(accion => {
        console.log(accion.tiene_inicio);
        try {
          const dateAccion = LswTimer.utils.getDateFromMomentoText(accion.tiene_inicio);
          console.log(dateAccion);
          if(dateAccion >= estaHora) {
            accionesDespues.push(accion);
          } else {
            accionesAntes.push(accion);
          }
        } catch (error) {
          console.log(error);
        }
      });
      this.accionesAntes = accionesAntes;
      this.accionesDespues = accionesDespues;
      this.$forceUpdate(true);
    },
    async alternarEstado(accion) {
      this.$trace("lsw-current-accion-viewer.methods.alternarEstado");
      const nextEstado = accion.tiene_estado === "pendiente" ? "completada" : 
        accion.tiene_estado === "completada" ? "fallida" : "pendiente";
      await this.$lsw.database.update("Accion", accion.id, {
        ...accion,
        tiene_estado: nextEstado
      });
      await this.loadAcciones();
    },
    async reloadPanel() {
      this.$trace("lsw-current-accion-viewer.methods.reloadPanel");
      await this.loadAcciones();
    },
    async openNotaUploader() {
      this.$trace("lsw-current-accion-viewer.methods.openNotaUploader", arguments);
      const response = await LswUtils.openAddNoteDialog();
      if(typeof response !== "object") {
        return;
      }
      await this.$lsw.database.insert("Nota", response);
    },
    openWikiExplorer() {
      this.$trace("lsw-windows-main-tab.methods.openWikiExplorer", arguments);
      this.$dialogs.open({
        id: "wiki-explorer-" + LswRandomizer.getRandomString(5),
        title: "Wiki explorer",
        template: `<div class="pad_2"><lsw-wiki /></div>`,
      });
    },
    async openArticuloUploader() {
      this.$trace("lsw-windows-main-tab.methods.openArticuloUploader", arguments);
      const response = await LswUtils.openAddArticuloDialog();
      if(typeof response !== "object") {
        return;
      }
      await this.$lsw.database.insert("Articulo", response);
    }
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-current-accion-viewer.mounted");
      await this.loadAcciones();
    } catch(error) {
      console.log(error);
    }
  },
});
// @code.end: LswCurrentAccionViewer API