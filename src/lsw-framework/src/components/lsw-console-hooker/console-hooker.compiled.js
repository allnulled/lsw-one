/*
  @artifact:  Lite Starter Web Dependency
  @url:       https://github.com/allnulled/lsw-console-hooker.git
  @name:      @allnulled/lsw-console-hooker
  @version:   1.0.0
*/
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['ConsoleHooker'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['ConsoleHooker'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  class ConsoleHooker {
    constructor(outputElementId) {
      this.originalConsole = { ...console }; // Guardar los métodos originales
      this.outputElementId = outputElementId;
      this.hookConsole();
      this.messageCounter = 0;
    }

    hookConsole() {
      Object.keys(console).forEach(method => {
        if (typeof console[method] === 'function') {
          console[method] = (...args) => {
            this.writeToHtml(method, args);
            this.originalConsole[method](...args); // Llamar al método original
          };
        }
      });
    }

    formatError(error) {
      let errorMessage = "";
      errorMessage += "Error: " + error.name + ": " + error.message;
      if (error.location) {
        errorMessage += JSON.stringify({
          found: error.found,
          expected: error.expected,
          location: error.location
        }, null, 2);
      }
      return errorMessage;
    }

    consoleReducer() {
      return (arg) => {
        if (typeof arg === 'object') {
          if (arg instanceof Error) {
            return this.formatError(arg);
          } else {
            const seen = new WeakSet();
            return JSON.stringify(arg, function (key, value) {
              if (typeof value === "object") {
                if (seen.has(value)) {
                  return "[Circular]";
                }
                if (value !== null) {
                  seen.add(value);
                }
              }
              return value;
            }, 2);
          }
        } else {
          return arg;
        }
      };
    }

    writeToHtml(method, args) {
      // Do not log from this method or it becomes recursive:
      const message = document.createElement('div');
      message.className = `console-${method}`;
      message.textContent = `[${this.messageCounter++}] ${args.map(this.consoleReducer()).join(' ')}`;
      const outputElement = document.getElementById(this.outputElementId);
      if (!outputElement) {
        // console.log("no console hooker output element found");
        return;
      }
      const subnodes = outputElement.children;
      const subnodesLength = outputElement.children.length;
      const hasMoreThan100 = outputElement.children.length > 100;
      if (hasMoreThan100) {
        for (let index = subnodes.length - 1; index > 50; index--) {
          const subnode = subnodes[index];
          subnode.remove();
        }
      }
      const parent = outputElement;
      parent.insertBefore(message, parent.firstChild);
    }

    restoreConsole() {
      Object.keys(this.originalConsole).forEach(method => {
        console[method] = this.originalConsole[method];
      });
    }
  }

  ConsoleHooker.default = ConsoleHooker;

  return ConsoleHooker;

});Vue.component("LswConsoleHooker", {
  template: <div class="console-hooker" :class="{hide:!is_shown}">
    <div class="console_viewer">
        <div class="console_box">
            <div class="console_box_title" style="display: flex; flex-direction: row; width: 100%; align-items: center;">
                <span style="flex: 100;">console hooker</span>
                <span style="flex: 1;">
                    <button v-on:click="hide">X</button>
                </span>
            </div>
            <div class="console_box_output_container">
                <div class="console_box_output" id="lsw-console-hooker-output"></div>
            </div>
        </div>
    </div>
</div>,
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
    }
  },
  mounted() {
    this.instance = new ConsoleHooker("lsw-console-hooker-output");
    if(process.env.NODE_ENV !== "production") {
    }
    this.instance.restoreConsole();
    this.hide();
    this.$vue.prototype.$consoleHooker = this;
    this.$window.LswConsoleHooker = this;
  },
  unmounted() {

  }
});