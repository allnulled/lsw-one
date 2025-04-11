const basepath = require("path").resolve(__dirname + "/../../../src/");

module.exports = [
  `${basepath}/bootloader/preboot.js`,
  `${basepath}/lsw-framework/lsw-framework.js`,
  // La parte de componentes:
  `${basepath}/interware/components-distribution.js`,
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