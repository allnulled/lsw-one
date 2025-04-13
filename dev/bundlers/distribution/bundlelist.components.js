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
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/lsw-automensajes-viewer/lsw-automensajes-viewer`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/lsw-current-accion-viewer/lsw-current-accion-viewer`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/components/lsw-protolang-editor/lsw-protolang-editor`,
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
  // LSW INITIALIZATION
  `${basepath}/bootloader/boot.js`,
  `${basepath}/bootloader/runner.js`,
];