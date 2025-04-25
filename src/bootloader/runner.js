LswLifecycle.start().then(async output => {
  console.log("[*] App lifecycle ended.");
  
  Work_relocation: {
    // LswDom.querySelectorFirst(".home_bottom_panel > button", "+ 💬").click();
    // LswDom.querySelectorFirst(".home_mobile_off_panel > .mobile_off_panel_cell", "💬").click();
    LswDom.querySelectorFirst("#windows_pivot_button", "🔵").click();
    await LswDom.waitForMilliseconds(100);
    LswDom.querySelectorFirst("button.main_tab_topbar_button", "🔧").click();
  }


}).catch(console.error);