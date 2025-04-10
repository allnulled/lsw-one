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

    onStarted: function () {
      console.log("[trace][lsw-app-lifecycle] onStarted");
      return this.hooks.emit("app:started");
    },

    onInitialize: function () {
      console.log("[trace][lsw-app-lifecycle] onInitialize");
      return this.hooks.emit("app:initialize");
    },

    onInitialized: function () {
      console.log("[trace][lsw-app-lifecycle] onInitialized");
      return this.hooks.emit("app:initialized");
    },

    onBoot: function () {
      console.log("[trace][lsw-app-lifecycle] onBoot");
      return this.hooks.emit("app:boot");
    },

    onBooted: function () {
      console.log("[trace][lsw-app-lifecycle] onBooted");
      return this.hooks.emit("app:booted");
    },

    onLoadModules: function () {
      console.log("[trace][lsw-app-lifecycle] onLoadModules");
      return this.hooks.emit("app:load_modules");
    },

    onModulesLoaded: function () {
      console.log("[trace][lsw-app-lifecycle] onModulesLoaded");
      return this.hooks.emit("app:modules_loaded");
    },
    onInstallModules: function () {
      console.log("[trace][lsw-app-lifecycle] onInstallModules");
      return this.hooks.emit("app:install_modules");
    },
    onModulesInstalled: function () {
      console.log("[trace][lsw-app-lifecycle] onModulesInstalled");
      return this.hooks.emit("app:modules_installed");
    },
    onLoadSchema: async function () {
      console.log("[trace][lsw-app-lifecycle] onLoadSchema");
      if (process.env.LSW_RESET_DATABASE) {
        await LswDatabase.deleteDatabase("lsw_default_database");
      }
      $lswSchema.loadSchemaByProxies("SchemaEntity");
      const databaseSchema = await $lswSchema.getDatabaseSchemaForLsw();
      console.log("[*] Creating database from schema by proxies:", databaseSchema);
      console.log(databaseSchema)
      await LswDatabase.createDatabase("lsw_default_database", databaseSchema);
      return await this.hooks.emit("app:load_schema");
    },
    onSchemaLoaded: function () {
      console.log("[trace][lsw-app-lifecycle] onSchemaLoaded");
      return this.hooks.emit("app:schema_loaded");
    },
    onSeedDatabase: async function () {
      console.log("[trace][lsw-app-lifecycle] onSeedDatabase");
      Fill_with_your_own_requirements: {
        // @TOFILLIFNEEDED:
      }
      return await this.hooks.emit("app:seed_database");
    },
    onDatabaseSeeded: async function () {
      console.log("[trace][lsw-app-lifecycle] onDatabaseSeeded");
      Fill_with_your_own_requirements: {
        // @TOFILLIFNEEDED:
      }
      return await this.hooks.emit("app:database_seeded");
    },
    onLoadDatabase: async function () {
      console.log("[trace][lsw-app-lifecycle] onLoadDatabase");
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
      console.log("[trace][lsw-app-lifecycle] onDatabaseLoaded");
      return this.hooks.emit("app:database_loaded");
    },
    onLoadApplication: function () {
      console.log("[trace][lsw-app-lifecycle] onLoadApplication");
      return this.hooks.emit("app:load_application");
    },
    onApplicationLoaded: function () {
      console.log("[trace][lsw-app-lifecycle] onApplicationLoaded");
      return this.hooks.emit("app:application_loaded");
    },

    onAllLoaded: function () {
      console.log("[trace][lsw-app-lifecycle] onAllLoaded");
      return this.hooks.emit("app:all_loaded");
    },

    onFinished: function () {
      console.log("[trace][lsw-app-lifecycle] onFinished");
      return this.hooks.emit("app:finished");
    },

    loadModule: function (moduleId) {
      console.log("[trace][lsw-app-lifecycle] loadModule");
      return Vue.prototype.$lsw.importer.scriptAsync(`modules/${moduleId}/load.js`);
    },

    loadSubmodule: function (moduleId, subpath) {
      console.log("[trace][lsw-app-lifecycle] loadSubmodule");
      return Vue.prototype.$lsw.importer.scriptAsync(`modules/${moduleId}/${subpath}`);
    },

    start: function () {
      console.log("[trace][lsw-app-lifecycle] start");
      return this.run(this.steps);
    },

  }, "*");

  return cycle;

});