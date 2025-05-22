// @code.start: LswConsoleHooker API | @$section: Vue.js (v2) Components » LswConsoleHooker API » LswConsoleHooker component
Vue.component("LswConsoleHooker", {
  template: $template,
  props: {},
  data() {
    return {
      is_shown: true,
      is_minimized: false,
      is_amplified: false,
      instance: undefined
    }
  },
  methods: {
    show() {
      this.is_shown = true;
    },
    hide() {
      this.is_shown = false;
    },
    minimize() {
      this.is_minimized = true;
    },
    maximize() {
      this.is_minimized = false;
    },
    cleanConsole() {
      this.$refs.console_output.textContent = "⚓️ Consola hookeada preparada ⚓️";
    },
    toggleAmplify() {
      this.is_amplified = !this.is_amplified;
      this.$forceUpdate(true);
    },
    executeInput() {
      const input = this.$refs.commandInput.value;
      try {
        const result = this.$window.eval(input);
        console.log(result);
      } catch (error) {
        console.error({
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
      this.$refs.commandInput.value = "";
    },
    deactivateConsole() {
      this.instance.restoreConsole();
      this.hide();
    },
    activateConsole() {
      this.instance.hookConsole();
      this.show();
    },
  },
  mounted() {
    this.instance = new ConsoleHooker("lsw-console-hooker-output");
    this.activateConsole();
    Exportar_consola: {
      this.$vue.prototype.$consoleHooker = this;
      this.$window.LswConsoleHooker = this;
    }
  },
  unmounted() {

  }
});
// @code.end: LswConsoleHooker API