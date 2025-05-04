const basepath = require("path").resolve(__dirname + "/../../../src");

module.exports = [
  `${basepath}/bootloader/preboot.js`,
  // La parte de componentes:
  `${basepath}/lsw-framework/lsw-framework.css`,
  `${basepath}/lsw-framework/lsw-framework.js`,
  // Continuation:
  `${basepath}/assets/lib/jquery/jquery-v3.7.1.js`,
  `${basepath}/assets/lib/marked/marked.js`,
  `${basepath}/modules/org.allnulled.lsw.wiki/load.js`,
  `${basepath}/modules/org.allnulled.lsw.fs/load.js`,
  `${basepath}/modules/org.allnulled.lsw.db/load.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/load.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/lsw-automensajes-viewer/lsw-automensajes-viewer`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/lsw-apps-viewer-button/lsw-apps-viewer-button`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/lsw-apps-viewer-panel/lsw-apps-viewer-panel`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/lsw-protolang-editor/lsw-protolang-editor`,

  // Spontaneous Forms & Tables:
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/forms/lsw-spontaneous-form-accion/lsw-spontaneous-form-accion`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/forms/lsw-spontaneous-form-articulo/lsw-spontaneous-form-articulo`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/forms/lsw-spontaneous-form-lista/lsw-spontaneous-form-lista`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/forms/lsw-spontaneous-form-nota/lsw-spontaneous-form-nota`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/forms/lsw-spontaneous-form-recordatorio/lsw-spontaneous-form-recordatorio`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/tables/lsw-spontaneous-table-accion/lsw-spontaneous-table-accion`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/tables/lsw-spontaneous-table-articulo/lsw-spontaneous-table-articulo`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/tables/lsw-spontaneous-table-lista/lsw-spontaneous-table-lista`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/tables/lsw-spontaneous-table-nota/lsw-spontaneous-table-nota`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/tables/lsw-spontaneous-table-recordatorio/lsw-spontaneous-table-recordatorio`,

  `${basepath}/modules/org.allnulled.lsw-conductometria/components/controls/lsw-fast-datetime-control/lsw-fast-datetime-control`,

  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Accion.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Concepto.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Categoria_de_concepto.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Propagador_prototipo.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Propagador_de_concepto.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Limitador.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Impresion.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Nota.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Automensaje.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Articulo.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Lista.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Recordatorio.js`,
  // LSW INITIALIZATION
  `${basepath}/bootloader/boot.js`,
  `${basepath}/bootloader/runner.js`,
];