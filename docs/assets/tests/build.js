const fs = require("fs");
const path = require("path");
const urls = [];
const baseDir = path.resolve(__dirname + "/..");
const casesDir = __dirname + "/cases";
const casesPriority = [
  "lsw-framework",
  "application"
];
const findCasePriority = function(caseName) {
  const casePos = casesPriority.indexOf(caseName);
  return casePos === -1 ? 2000 : casePos;
}
const casesNames = fs.readdirSync(casesDir).sort((a,b) => {
  const posA = findCasePriority(a);
  const posB = findCasePriority(b);
  return posB < posA ? 1 : -1;
});
for(let indexCase=0; indexCase<casesNames.length; indexCase++) {
  const caseName = casesNames[indexCase];
  const testNames = fs.readdirSync(`${casesDir}/${caseName}`);
  for(let indexTest=0; indexTest<testNames.length; indexTest++) {
    const testName = testNames[indexTest];
    const fullPath = `${casesDir}/${caseName}/${testName}`;
    const relativePath = fullPath.replace(baseDir, "assets");
    urls.push(relativePath);
  }
}
fs.writeFileSync(__dirname + "/urls.json", JSON.stringify(urls, null, 2), "utf8");
