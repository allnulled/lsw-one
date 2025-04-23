// @code.start: LswAutomensajesViewer API | @$section: Módulo org.allnulled.lsw-conductometria » Vue.js (v2) Components » LswAutomensajesViewer API » LswAutomensajesViewer component
Vue.component("LswAutomensajesViewer", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-automensajes-viewer.data");
    return {
      isMounted: false,
      automensajes: [],
      selectedAutomensaje: undefined,
      automessagingId: undefined,
      automessagingSeconds: 0,
      simboloActual: "♠️",
      // simboloActual: LswRandomizer.getRandomItem("🌅🌄🌠🎇🎆🌇🌆🏙🌃🌌🌉🌁".split("")),
      
      // simboloActual: LswRandomizer.getRandomItem("🐶🐱🐵🐗🐴🐌🐜🌋🏭🏢🏬🏣🚀🛸🚁🎲🎯🎳🎮🗽🗼🛟🎱🐞🌝🌛🌜🌚🌕🌖🌗🌘🌑🌒🌓🌔🌙🌎🌍🌏🪐💫⭐️🌟✨⚡️☄️💥🔥🌪🌈🐉🐲🐦‍🔥🌵🎄🌲🌳🌴🪹🪺🪵🌱🌿🍀🍁🍄🍄‍🟫🌾💐🌷🪷🌹🥀🌺🎪🤹🤹‍♂️🤹‍♀️🎭🎨🎼🎹🥁🪘🪇🎷🎺🪗🎸🪕🎻🪈♟🎰🧩🚗🚕🚙🎬🎤🎧💧💦🫧☔️☂️🌊🍏🍎🍐🍊🍋🍋‍🟩🍌🍉🍇🍓🫐🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🫛".split("")),
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
      console.log(this.automensajes);
      const availableAutomensajes = this.automensajes.filter(a => {
        if((typeof this.selectedAutomensaje !== "object") || (typeof this.selectedAutomensaje.tiene_contenido !== "string")) return true;
        return a.tiene_contenido !== this.selectedAutomensaje.tiene_contenido;
      });
      console.log(availableAutomensajes);
      this.selectedAutomensaje = LswRandomizer.getRandomItem(availableAutomensajes);
      this.continueAutomessaging();
    },
    async startAutomessaging() {
      this.$trace("LswAutomensajesViewer.methods.startAutomessaging", arguments);
      await this.loadAutomensajes();
      await this.sendAutomessage();
      await this.continueAutomessaging();
    },
    async continueAutomessaging() {
      this.$trace("LswAutomensajesViewer.methods.continueAutomessaging", arguments);
      clearTimeout(this.automessagingId);
      this.automessagingSeconds = LswRandomizer.getRandomIntegerBetween(5,15);
      this.automessagingId = setTimeout(() => this.sendAutomessage(), this.automessagingSeconds * 1000);
    },
    stopAutomessaging() {
      this.$trace("LswAutomensajesViewer.methods.stopAutomessaging");
      clearTimeout(this.automessagingId);
    },
    async refreshAutomessaging() {
      this.$trace("LswAutomensajesViewer.methods.refreshAutomessaging", arguments);
      this.stopAutomessaging();
      this.startAutomessaging();
      this.$window.changeBackgroundImage();
    },
    goToDesktop() {
      this.$trace("LswAutomensajesViewer.methods.goToDesktop", arguments);
      this.$lsw.windows.hide();
      this.$refs.appPanel.selectApplication("none");
    },
    selectApplication(application) {
      this.$trace("LswAutomensajesViewer.methods.selectApplication", arguments);
      this.$refs.appPanel.selectApplication(application);
    }
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-automensajes-viewer.mounted");
      this.$window.$automensajesUi = this;
      this.startAutomessaging();
      this.isMounted = true;
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