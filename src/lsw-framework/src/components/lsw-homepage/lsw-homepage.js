const homepage_apps_events = {
  "base de datos": function () {

  },
  "calendario": function () {

  },
  "sistema de ficheros": function () {

  },
  "configuraciones": function () {

  },
  "calendario": function () {

  },
  "tareas posteriores": function () {

  },
  "tareas anteriores": function () {

  },
  "conductometria": function () {

  },
  "notas": function () {

  },
  "nueva nota": function () {

  },
  "enciclopedia": function () {

  },
  "nuevo articulo": function () {

  },
};

// @code.start: LswHomepage API | @$section: Vue.js (v2) Components » LswHomepage component
Vue.component("LswHomepage", {
  template: $template,
  props: {
    appsViewer: {
      type: Object,
      required: true,
    }
  },
  data() {
    this.$trace("lsw-homepage.data");
    return {
      isLoaded: false,
      ownApps: {},
      lastAppliedFilter: false,
      filterSearchText: "",
      filteredApps: {},
      systemApps: [{
        label: "📦 Base de datos",
        event: () => this.abrirApp("base de datos"),
      }, {
        label: "📂 Sistema de ficheros",
        event: () => this.abrirApp("sistema de ficheros"),
      }, {
        label: "💣 Binarios",
        event: () => this.abrirApp("binarios"),
      }, {
        label: "📆 Calendario",
        event: () => this.abrirApp("calendario"),
      }, {
        label: "⬅️🕔 Tareas anteriores",
        event: () => this.abrirApp("antes"),
      }, {
        label: "🕔➡️ Tareas posteriores",
        event: () => this.abrirApp("despues"),
      }, {
        label: "💬 Notas",
        event: () => this.abrirApp("notas"),
      }, {
        label: "💬➕ Nueva nota",
        event: () => this.abrirApp("nueva nota"),
      }, {
        label: "🔬 Enciclopedia",
        event: () => this.abrirApp("enciclopedia"),
      }, {
        label: "🔬➕ Nuevo artículo",
        event: () => this.abrirApp("nuevo articulo"),
      }, {
        label: "🔧 Configuraciones",
        event: () => this.abrirApp("configuraciones"),
      }, {
        label: "✨ Nueva feature",
        event: () => this.abrirApp("nueva feature"),
      }]
    };
  },
  methods: {
    registerApp(appName, appData, force = false, silence = false) {
      this.$trace("lsw-homepage.methods.registerApp");
      try {
        if ((appName in this.ownApps) && !force) {
          throw new Error(`App «${appName}» is already registered`);
        }
        Validate_app_data: {
          const $ensureAppData = $ensure({ [appName]: appData }, 1).type("object");
          $ensureAppData.to.have.keys([
            "label", 
            "event",
          ]);
        }
        this.ownApps[appName] = appData;
      } catch (error) {
        if (!silence) {
          this.$lsw.toasts.showError(error);
        }
      }
    },
    filterApps() {
      this.$trace("lsw-homepage.methods.filterApps");
      const s = this.filterSearchText.toLowerCase();
      if (s.trim() === "") {
        this.lastAppliedFilter = false;
        return this.filteredApps = Object.assign({}, this.ownApps);
      }
      this.filteredApps = {};
      for (let appName in this.ownApps) {
        const appData = this.ownApps[appName];
        const pos = JSON.stringify([appName, appData]).toLowerCase().indexOf(s);
        if (pos !== -1) {
          this.filteredApps[appName] = appData;
        }
      }
      this.lastAppliedFilter = s;
      this.isLoaded = true;
    },
    async loadOwnApps() {
      this.$trace("lsw-homepage.methods.loadOwnApps");
      this.ownApps = {};
      System_apps: {
        for (let indexApp = 0; indexApp < this.systemApps.length; indexApp++) {
          const app = this.systemApps[indexApp];
          try {
            this.registerApp(app.label, app);
          } catch (error) {
            console.log(error);
          }
        }
      }
      Custom_apps: {
        const appsFilesMap = await this.$lsw.fs.read_directory("/kernel/apps");
        const appsFiles = Object.keys(appsFilesMap);
        for (let indexApp = 0; indexApp < appsFiles.length; indexApp++) {
          const appName = appsFiles[indexApp];
          try {
            const appData = await lsw.fs.evaluateAsJavascriptFileOrReturn("/kernel/apps/" + appName + "/load.js", false);
            this.registerApp(appName, appData);
          } catch (error) {
            console.log(error);
          }
        }
      }
      this.filterApps();
    },
    openAppsDirectory() {
      this.$trace("lsw-homepage.methods.openAppsDirectory");
      this.$lsw.dialogs.open({
        title: "Directorio de apps",
        template: `<lsw-filesystem-explorer opened-by="/kernel/apps" />`,
      });
    },
    async abrirApp(appId) {
      this.$trace("lsw-homepage.methods.abrirApp");
      this.$lsw.toasts.send({
        title: "Yendo a: " + appId,
      });
      this.appsViewer.selectApplication(appId);
    }
  },
  watch: {},
  mounted() {
    this.$trace("lsw-homepage.mounted");
    this.loadOwnApps();
  },
  unmounted() {
    this.$trace("lsw-homepage.unmounted");

  }
});
// @code.end: LswHomepage API