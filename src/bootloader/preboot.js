Start_environment: {
  window.process = Object.assign(window.process || {});
  window.process.env = Object.assign(window.process || {});
  window.process.env.NODE_ENV = window.location.href.startsWith("https") ? "production" : "test";
  window.process.env.NODE_ENV = "test";
  window.process.env.NODE_ENV = "production";
}

Set_global_configurations: {
  // Cambiar cuando se quiera resetear el esquema:
  process.env.LSW_RESET_DATABASE = 0;
  process.env.LSW_RESET_DATABASE = 1;
}