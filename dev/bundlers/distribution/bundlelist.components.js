const basepath = require("path").resolve(__dirname + "/../../../src");

module.exports = [
  // 1. El preboot:
  `${basepath}/bootloader/preboot.js`,
  // 2. El framework:
  `${basepath}/lsw-framework/lsw-framework.css`,
  `${basepath}/lsw-framework/lsw-framework.js`,
  // 3. Las librerías de terceros imprescindibles solamente:
  // `${basepath}/assets/lib/jquery/jquery-v3.7.1.js`,
  `${basepath}/assets/lib/marked/marked.js`,
  // 4. El payload de la app:
  `${basepath}/modules/app/load.js`,
  // 5. El payload personalizado:
  `${basepath}/modules/org.current.new/load.js`,
  // 6. El boot:
  `${basepath}/bootloader/boot.js`,
  // 7. El runner:
  `${basepath}/bootloader/runner.js`,
];