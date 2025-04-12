// 1. Bundle components:
require(__dirname + "/../core/vuebundler.js").bundle({
  list: __dirname + "/bundlelist.components.js",
  module: true,
  id: "Lsw_framework_components",
  output: __dirname + "/../../../src/lsw-framework/lsw-framework.js",
  ignore: [],
});