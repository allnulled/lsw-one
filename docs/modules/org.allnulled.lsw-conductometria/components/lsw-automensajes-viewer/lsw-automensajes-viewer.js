// @code.start: LswAutomensajesViewer API | @$section: Módulo org.allnulled.lsw-conductometria » Vue.js (v2) Components » LswAutomensajesViewer API » LswAutomensajesViewer component
Vue.component("LswAutomensajesViewer", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-automensajes-viewer.data");
    return {
      automensajes: [],
      selectedAutomensaje: undefined,
      automessagingId: undefined,
      automessagingSeconds: 0,
    };
  },
  methods: {
    async loadAutomensajes() {
      this.$trace("LswAutomensajesViewer.methods.loadAutomensajes", arguments);
      const automensajes = await this.$lsw.database.selectMany("Automensaje");
      this.automensajes = automensajes;
    },
    async sendAutomessage() {
      this.$trace("LswAutomensajesViewer.methods.sendAutomessage", arguments);
      const availableAutomensajes = this.automensajes.filter(a => {
        if((typeof this.selectedAutomensaje !== "object") || (typeof this.selectedAutomensaje.tiene_contenido !== "string")) return true;
        return a.tiene_contenido !== this.selectedAutomensaje.tiene_contenido;
      });
      this.selectedAutomensaje = LswRandomizer.getRandomItem(availableAutomensajes);
      console.log(this.selectedAutomensaje);
      this.$forceUpdate(true);
      this.startAutomessaging();
    },
    startAutomessaging() {
      this.$trace("LswAutomensajesViewer.methods.startAutomessaging", arguments);
      this.automessagingSeconds = LswRandomizer.getRandomIntegerBetween(5,15);
      this.automessagingId = setTimeout(() => this.sendAutomessage(), this.automessagingSeconds * 1000);
    },
    stopAutomessaging() {
      this.$trace("LswAutomensajesViewer.methods.stopAutomessaging");
      clearTimeout(this.automessagingId);
    },
    async refreshAutomessaging() {
      this.$trace("LswAutomensajesViewer.methods.refreshAutomessaging", arguments);
      await this.loadAutomensajes();
      this.stopAutomessaging();
      this.startAutomessaging();
    }
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-automensajes-viewer.mounted");
      await this.loadAutomensajes();
      this.sendAutomessage();
      await this.startAutomessaging();
    } catch(error) {
      console.log(error);
    }
  },
  unmount() {
    this.$trace("lsw-automensajes-viewer.unmount");
    this.stopAutomessaging();
  }
});
// @code.end: LswAutomensajesViewer API