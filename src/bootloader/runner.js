LswLifecycle.hooks.register("app:load_modules", "inject_application", async () => {
  try {
    Step_1_inject_application_component: {
      await LswLifecycle.loadModule("app");
    }
    Step_2_inject_application: {
      if (!Vue.options.components.App) {
        throw new Error("Required Vue.js (v2) component «App» to be defined on «LswLifecycle.onRunApplication» for hook «app:run_application»");
      }
      const vueInstance = new Vue({
        render: h => h(Vue.options.components.App),
      }).$mount("#app");
    }
  } catch (error) {
    console.error(error);
  }
});

LswLifecycle.start().then(console.log).catch(console.error);