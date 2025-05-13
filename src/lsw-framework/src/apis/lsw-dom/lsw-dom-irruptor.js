(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswDomIrruptor'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswDomIrruptor'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  // @code.start: LswDomIrruptor class | @section: Lsw Dom Irruptor API » LswDomIrruptor class
  const LswDomIrruptor = class {

    static async aniadirNota() {
      LswDom.querySelectorFirst(".home_bottom_panel > button", "+ 💬").click();
    }
    static async verNotas() {
      LswDom.querySelectorFirst(".home_mobile_off_panel > .mobile_off_panel_cell", "💬").click();
    }
    static async calendario() {
      LswDom.querySelectorFirst(".home_mobile_off_panel > .mobile_off_panel_cell", "📅").click();
    }
    static async reportesDeCalendario() {
      LswDom.querySelectorFirst(".home_mobile_off_panel > .mobile_off_panel_cell", "📅").click();
      await LswDom.waitForMilliseconds(100);
      LswDom.querySelectorFirst("button.nowrap", "📊").click();
      await LswDom.waitForMilliseconds(100);
      LswDom.querySelectorFirst("button", "🔮 Iniciar conductometría").click();
      
    }
    static async abrirNavegacionRapida() {
      LswDom.querySelectorFirst(".lsw_apps_button > button", "🌍").click();
    }
    static async abrirBaseDeDatos() {
      LswDom.querySelectorFirst(".lsw_apps_button > button", "📟").click();
      await LswDom.waitForMilliseconds(100);
      LswDom.querySelectorFirst("div", "↗️ Base de datos").click();
    }
    static async abrirAccionesVirtuales() {
      await this.abrirBaseDeDatos();
      await LswDom.waitForMilliseconds(100);
      LswDom.querySelectorFirst("button", "Accion_virtual").click();
    }
    static async abrirTareasPosterioresDeNavegacionRapida() {
      LswDom.querySelectorFirst(".lsw_apps_viewer_button button", "🕓 Tareas posteriores").click();
    }
    static async configuraciones() {
      LswDom.querySelectorFirst("#windows_pivot_button", "🔵").click();
      await LswDom.waitForMilliseconds(100);
      LswDom.querySelectorFirst("button.main_tab_topbar_button", "🔧").click();
    }
    static async abrirWiki() {
      LswDom.querySelectorFirst(".mobile_off_panel_cell", "🔬").click();
    }
    static async abrirWikiArticulos() {
      await this.abrirWiki();
      await LswDom.waitForMilliseconds();
      Abrir_articulos: {
        await LswDom.waitForMilliseconds(100);
        LswDom.querySelectorFirst(".lsw_wiki button.supermini", "🔬").click();
        return;
      }
    }
    static async abrirWikiLibros() {
      await this.abrirWiki();
      await LswDom.waitForMilliseconds();
      Abrir_libros: {
        await LswDom.waitForMilliseconds(100);
        LswDom.querySelectorFirst(".lsw_wiki button.supermini", "📚").click();
      }
    }

  }

  return LswDomIrruptor;
  // @code.end: LswDomIrruptor class

});