LswLifecycle.start().then(output => {
  console.log("[*] App lifecycle ended.");
  
  Work_relocation: {
    LswDom.querySelectorFirst(".home_bottom_panel > button", "+ 💬").click();
  }


}).catch(console.error);