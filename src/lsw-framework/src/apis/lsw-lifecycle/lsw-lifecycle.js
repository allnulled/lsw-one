(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswLifecycle'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswLifecycle'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  /**
   * 
   * 
   * @$section: Lsw LswCycler API » LswCycler class
   * @type: class
   * @extends: Object
   * @vendor: lsw
   * @namespace: LswCycler
   * @source code: La clase está definida así:
   * 
   */
  // @code.start: LswCycler class | @section: Lsw LswCycler API » LswCycler class
  const cycle = LswCycler.from({

    steps: [
      "onStarted",
      "onInitialize",
      "onInitialized",
      "onBoot",
      "onBooted",
      "onLoadModules",
      "onModulesLoaded",
      "onInstallModules",
      "onModulesInstalled",
      "onLoadSchema",
      "onSchemaLoaded",
      "onLoadDatabase",
      "onDatabaseLoaded",
      "onLoadApplication",
      "onApplicationLoaded",
      "onAllLoaded",
      "onFinished",
    ],

    hooks: TriggersClass.create(),

    $trace: function(method, args) {
      if(Vue.prototype.$trace) {
        Vue.prototype.$trace("lsw-app-lifecycle." + method, args);
      }
    },

    onStarted: function () {
      this.$trace("onStarted", []);
      return this.hooks.emit("app:started");
    },

    onInitialize: function () {
      this.$trace("onInitialize", []);
      return this.hooks.emit("app:initialize");
    },

    onInitialized: function () {
      this.$trace("onInitialized", []);
      return this.hooks.emit("app:initialized");
    },

    onBoot: function () {
      this.$trace("onBoot", []);
      return this.hooks.emit("app:boot");
    },

    onBooted: function () {
      this.$trace("onBooted", []);
      return this.hooks.emit("app:booted");
    },

    onLoadModules: function () {
      this.$trace("onLoadModules", []);
      return this.hooks.emit("app:load_modules");
    },

    onModulesLoaded: function () {
      this.$trace("onModulesLoaded", []);
      return this.hooks.emit("app:modules_loaded");
    },
    onInstallModules: function () {
      this.$trace("onInstallModules", []);
      return this.hooks.emit("app:install_modules");
    },
    onModulesInstalled: function () {
      this.$trace("onModulesInstalled", []);
      return this.hooks.emit("app:modules_installed");
    },
    onLoadSchema: async function () {
      this.$trace("onLoadSchema", []);
      if (process.env.LSW_RESET_DATABASE) {
        await LswDatabase.deleteDatabase("lsw_default_database");
      }
      $lswSchema.loadSchemaByProxies("SchemaEntity");
      const databaseSchema = await $lswSchema.getDatabaseSchemaForLsw();
      console.log("[*] Creating database from schema by proxies:", Object.keys(databaseSchema).join(", "));
      return await this.hooks.emit("app:load_schema");
    },
    onSchemaLoaded: function () {
      this.$trace("onSchemaLoaded", []);
      return this.hooks.emit("app:schema_loaded");
    },
    onSeedDatabase: async function () {
      this.$trace("onSeedDatabase", []);
      Fill_with_your_own_requirements: {
        // @TOFILLIFNEEDED:
      }
      return await this.hooks.emit("app:seed_database");
    },
    onDatabaseSeeded: async function () {
      this.$trace("onDatabaseSeeded", []);
      Fill_with_your_own_requirements: {
        // @TOFILLIFNEEDED:
      }
      return await this.hooks.emit("app:database_seeded");
    },
    onLoadDatabase: async function () {
      this.$trace("onLoadDatabase", []);
      Load_database_connection: {
        Vue.prototype.$lsw.database = await LswDatabase.open("lsw_default_database");
        Vue.prototype.$lsw.database.setInnerSchema($lswSchema);
      }
      if(process.env.LSW_RESET_DATABASE) {
        await this.onSeedDatabase();
        await this.onDatabaseSeeded();
      }
      return await this.hooks.emit("app:load_database");
    },
    onDatabaseLoaded: function () {
      this.$trace("onDatabaseLoaded", []);
      return this.hooks.emit("app:database_loaded");
    },
    onLoadApplication: function () {
      this.$trace("onLoadApplication", []);
      return this.hooks.emit("app:load_application");
    },
    onApplicationLoaded: function () {
      this.$trace("onApplicationLoaded", []);
      return this.hooks.emit("app:application_loaded");
    },

    onAllLoaded: function () {
      this.$trace("onAllLoaded", []);
      return this.hooks.emit("app:all_loaded");
    },

    onFinished: function () {
      this.$trace("onFinished", []);
      return this.hooks.emit("app:finished");
    },

    loadModule: function (moduleId) {
      this.$trace("loadModule", []);
      return Vue.prototype.$lsw.importer.scriptAsync(`modules/${moduleId}/load.js`);
    },

    loadSubmodule: function (moduleId, subpath) {
      this.$trace("loadSubmodule", []);
      return Vue.prototype.$lsw.importer.scriptAsync(`modules/${moduleId}/${subpath}`);
    },

    start: function () {
      this.$trace("start", []);
      return this.run(this.steps);
    },

  }, "*");
  // @code.end: LswCycler class

  return cycle;

});