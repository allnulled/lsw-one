npx pegjs --format globals --export-var VolatileRowParser -o volatile-row.parser.js volatile-row.parser.pegjs
node fix.js
node test-parser.js