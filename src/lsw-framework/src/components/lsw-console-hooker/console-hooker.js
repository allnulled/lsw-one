// @code.start: LswConsoleHooker API | @$section: Vue.js (v2) Components » LswConsoleHooker API » LswConsoleHooker component
Vue.component("LswConsoleHooker", {
  template: $template,
  props: {},
  data() {
    return {
      is_shown: true,
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
    }
  },
  mounted() {
    this.instance = new ConsoleHooker("lsw-console-hooker-output");
    Desactivar_consola: {
      // this.instance.restoreConsole();
      // this.hide();
    }
    Activar_consola: {
      // this.instance.hookConsole();
      this.show();
    }
    Hacerlo_condicionalmente: {
      if(process.env.NODE_ENV !== "production") {
        
      } else {

      }
    }
    Exportar_consola: {
      this.$vue.prototype.$consoleHooker = this;
      this.$window.LswConsoleHooker = this;
    }
  },
  unmounted() {

  }
});
// @code.end: LswConsoleHooker API