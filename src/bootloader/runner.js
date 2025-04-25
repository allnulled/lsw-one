LswLifecycle.start().then(async output => {
  console.log("[*] App lifecycle ended.");
  
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
  }

  Work_relocation: {
    await LswDom.waitForMilliseconds(100);
    await goTo.calendario();
    return;
    await LswDom.waitForMilliseconds(100);
    await goTo.abrirNavegacionRapida();
    await LswDom.waitForMilliseconds(100);
    await goTo.abrirTareasPosterioresDeNavegacionRapida();
    return;
  }


}).catch(console.error);