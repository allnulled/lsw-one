// 1. Bundle components:
require(__dirname + "/../core/vuebundler.js").bundle({
  list: __dirname + "/bundlelist.components.js",
  module: true,
  id: "Litestarter_app",
  output: __dirname + "/../../../src/assets/distribution.js",
  ignore: [],
});

// 2. Export assets, index and dist files to dist folder:
const utils = require(__dirname + "/../../utils/utils.js");
utils.copyDirectorySync(__dirname + "/../../../src/assets", __dirname + "/../../../docs/assets");
utils.copyDirectorySync(__dirname + "/../../../src/modules", __dirname + "/../../../docs/modules");
utils.copyFilesOnlySync(__dirname + "/../../../src", __dirname + "/../../../docs");