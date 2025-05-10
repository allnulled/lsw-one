LswLifecycle.start().then(async output => {
  console.log("[*] App lifecycle ended.");

  // Vue.prototype.$lsw.logger.deactivate();
  
  const goTo = {
    async aniadirNota() {
      LswDom.querySelectorFirst(".home_bottom_panel > button", "+ 💬").click();
    },
    async verNotas() {
      LswDom.querySelectorFirst(".home_mobile_off_panel > .mobile_off_panel_cell", "💬").click();
    },
    async calendario() {
      LswDom.querySelectorFirst(".home_mobile_off_panel > .mobile_off_panel_cell", "📅").click();
    },
    async reportesDeCalendario() {
      LswDom.querySelectorFirst(".home_mobile_off_panel > .mobile_off_panel_cell", "📅").click();
      await LswDom.waitForMilliseconds(100);
      LswDom.querySelectorFirst("button.nowrap", "📊").click();
    },
    async abrirNavegacionRapida() {
      LswDom.querySelectorFirst(".lsw_apps_button > button", "🌍").click();
    },
    async abrirTareasPosterioresDeNavegacionRapida() {
      LswDom.querySelectorFirst(".lsw_apps_viewer_button button", "🕓 Tareas posteriores").click();
    },
    async configuraciones() {
      LswDom.querySelectorFirst("#windows_pivot_button", "🔵").click();
      await LswDom.waitForMilliseconds(100);
      LswDom.querySelectorFirst("button.main_tab_topbar_button", "🔧").click();
    },
    async abrirWiki() {
      LswDom.querySelectorFirst(".mobile_off_panel_cell", "🔬").click();
      Abrir_articulos: {
        await LswDom.waitForMilliseconds(100);
        LswDom.querySelectorFirst(".lsw_wiki button.supermini", "🔬").click();
        return;
      }
      Abrir_libros: {
        await LswDom.waitForMilliseconds(100);
        LswDom.querySelectorFirst(".lsw_wiki button.supermini", "📚").click();
      }
      Abrir_un_libro: {
        await LswDom.waitForMilliseconds(100);
        LswDom.querySelectorFirst(".nota_button .small_font", "Boot").click();
      }
    }
  }

  Work_relocation: {
    await LswDom.waitForMilliseconds(100);
    await goTo.reportesDeCalendario();
    try {
      await Vue.prototype.$lsw.fs.evaluateAsJavascriptFile("/kernel/boot.js");
    } catch (error) {
      Vue.prototype.$lsw.toasts.send({
        title: "Errores en el boot",
        text: "El boot lanzó un error: (" + error.name + ") " + error.message,
      })
    }
    return;
    await LswDom.waitForMilliseconds(100);
    await goTo.abrirWiki();
    await LswDom.waitForMilliseconds(100);
    await goTo.abrirNavegacionRapida();
    await LswDom.waitForMilliseconds(100);
    await goTo.abrirTareasPosterioresDeNavegacionRapida();
    return;
  }


}).catch(console.error);