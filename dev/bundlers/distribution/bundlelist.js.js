const basepath = require("path").resolve(__dirname + "/../../../src/");

module.exports = [
  `${basepath}/lsw-framework/src/others/socket.io-client/socket.io-client.js`,
  `${basepath}/lsw-framework/src/others/vue/vue2.dev.js`,
  `${basepath}/lsw-framework/src/others/vue.draggable/vue.draggable.js`,
  `${basepath}/lsw-framework/src/others/vue.draggable/sortable.js`,
  `${basepath}/importer.js`,
  `${basepath}/preboot.js`,
  `${basepath}/lsw-framework/lsw-framework.js`,
  `${basepath}/boot.js`,
  // Continuation:
  `${basepath}/assets/components-distribution.js`,
  `${basepath}/assets/lib/jquery/jquery-v3.7.1.js`,
  `${basepath}/assets/lib/marked/marked.js`,
];