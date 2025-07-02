const fs = require("fs");

let contents = fs.readFileSync(__dirname + "/volatile-row.parser.js").toString();
contents = contents.replace("\n})(this);", "\n})(typeof window === 'undefined' ? global : window);")
fs.writeFileSync(__dirname + "/volatile-row.parser.js", contents, "utf8");
