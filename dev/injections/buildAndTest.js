const child_process = require("child_process");

child_process.execSync("npm run build", {
  cwd: projectPath,
  stdio: [process.stdin, process.stdout, process.stderr]
});

child_process.execSync("npm run test", {
  cwd: projectPath,
  stdio: [process.stdin, process.stdout, process.stderr]
});