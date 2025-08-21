const fs = require("fs");

let contents = "";
contents += fs.readFileSync(__dirname + "/naty-script-parser.js").toString();
contents = contents.replace("\n})(this);", "\n})(typeof window === 'undefined' ? global : window);")
fs.writeFileSync(__dirname + "/naty-script-parser.js", contents, "utf8");
contents += fs.readFileSync(__dirname + "/lsw-naty-script.js").toString();
