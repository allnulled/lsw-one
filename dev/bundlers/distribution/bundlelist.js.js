const basepath = require("path").resolve(__dirname + "/../../../src/");

module.exports = [
  `${basepath}/lsw-framework/src/others/socket.io-client/socket.io-client.js`,
  `${basepath}/lsw-framework/src/others/vue/vue2.dev.js`,
  `${basepath}/lsw-framework/src/others/vue.draggable/vue.draggable.js`,
  `${basepath}/lsw-framework/src/others/vue.draggable/sortable.js`,
  `${basepath}/bootloader/importer.js`,
  `${basepath}/bootloader/preboot.js`,
  `${basepath}/lsw-framework/lsw-framework.js`,
  `${basepath}/assets/components-distribution.js`,
  // Continuation:
  `${basepath}/assets/lib/jquery/jquery-v3.7.1.js`,
  `${basepath}/assets/lib/marked/marked.js`,
  `${basepath}/modules/org.allnulled.lsw.wiki/load.js`,
  `${basepath}/modules/org.allnulled.lsw.fs/load.js`,
  `${basepath}/modules/org.allnulled.lsw.db/load.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Accion.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Concepto.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Categoria_de_concepto.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Propagador_prototipo.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Propagador_de_concepto.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Limitador.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Impresion.js`,
  `${basepath}/modules/org.allnulled.lsw-conductometria/proxy/Nota.js`,
  `${basepath}/bootloader/boot.js`,
  `${basepath}/bootloader/runner.js`,
];