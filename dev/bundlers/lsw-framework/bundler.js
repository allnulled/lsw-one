// 1. Bundle components:
require(__dirname + "/../core/vuebundler.js").bundle({
  list: __dirname + "/bundlelist.components.js",
  module: true,
  id: "Lsw_framework_components",
  output: __dirname + "/../../../src/lsw-framework/lsw-framework.js",
  ignore: [],
});

// 2. Copy instrumented code to assets/coverage:
require("fs-extra").copySync(__dirname + "/../../../src-instrumented", __dirname + "/../../../src/assets/coverage");

// 3. Compile tests:
require(__dirname + "/../../../src/assets/tests/build.js");