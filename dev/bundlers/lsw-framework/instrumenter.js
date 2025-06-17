

const Instrumenter = class {

  static $acceptAllFiles() {
    return true;
  }

  static $regexForjsFiles = /\.js$/g;

  static instrumentalizeFile(file) {
    const fileInstr = file.replace(this.$regexForjsFiles, "") + ".inst.js";
    require("child_process").execSync(`npx nyc instrument --compact false '${file}' '${fileInstr}'`);
    return fileInstr;
  }

  static instrumentSet(allFiles, options = {}) {
    return allFiles;
    PELIGROSISIMO_TE_BORRO_LOS_FICHEROS_Y_TE_JODO_EL_PROYECTO: {
      const finalFiles = [];
      const fileFilter = options.fileFilter || this.$acceptAllFiles;
      for (let indexFile = 0; indexFile < allFiles.length; indexFile++) {
        const file = allFiles[indexFile];
        const isAccepted = fileFilter(file);
        if (isAccepted) {
          const instrumentedFile = this.instrumentalizeFile(file);
          finalFiles.push(instrumentedFile);
        }
      }
    }
    return finalFiles;
  }

}

module.exports = Instrumenter;