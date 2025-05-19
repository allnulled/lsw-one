(function() {

  const runner = async output => {
  
    console.log("[*] App lifecycle ended.");
  
    Logger_activation: {
      if(window.location.href.startsWith("https://")) {
        Vue.prototype.$lsw.logger.deactivate();
      } else {
        Vue.prototype.$lsw.logger.activate();
      }
    }
  
    Work_relocation: {
      try {
        Inject_kernel_bootjs: {
          await Vue.prototype.$lsw.fs.evaluateAsJavascriptFile("/kernel/boot.js");
        }
        Inject_development_point: {
          if(window.location.href.startsWith("http://")) {
            // await LswDomIrruptor.abrirBaseDeDatos();
          }
        }
      } catch (error) {
        Vue.prototype.$lsw.toasts.send({
          title: "Errores en el boot",
          text: "El boot lanzó un error: (" + error.name + ") " + error.message,
        });
      }
      return;
    }
  
  };

  LswLifecycle.start().then(runner).catch(console.error);

})();