const fs = require("fs");

let contents = fs.readFileSync(__dirname + "/timeformat.js").toString();
contents = contents.replace("\n})(this);", "\n})(typeof window === 'undefined' ? global : window);")
contents += "\n" + fs.readFileSync(__dirname + "/timeformat.api.js").toString();
fs.writeFileSync(__dirname + "/timeformat.bundled.js", contents, "utf8");
