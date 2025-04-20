LswLifecycle.start().then(output => {
  console.log("[*] App lifecycle ended.");
  
  Work_relocation: {
    // LswDom.querySelectorFirst(".home_bottom_panel > button", "+ 💬").click();
    LswDom.querySelectorFirst(".home_mobile_off_panel > .mobile_off_panel_cell", "💬").click();
  }


}).catch(console.error);