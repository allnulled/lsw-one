(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswFilesystem'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswFilesystem'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  class LswFilesystem extends UFS_manager.idb_driver {

    async ensureFile(filepath, contents) {
      this.trace("ensureFile", [filepath, contents]);
      const pathParts = filepath.split("/").filter(file => file.trim() !== "");
      const directoryParts = [].concat(pathParts);
      const filename = directoryParts.pop();
      let currentPathPart = "";
      for (let index = 0; index < directoryParts.length; index++) {
        const pathPart = directoryParts[index];
        currentPathPart += "/" + pathPart;
        const existsSubpath = await this.exists(currentPathPart);
        if (!existsSubpath) {
          await this.make_directory(currentPathPart);
        }
      }
      const filepath2 = currentPathPart + "/" + filename;
      const existsFilepath2 = await this.exists(filepath2);
      if (!existsFilepath2) {
        await this.write_file(filepath2, contents);
      }
    }
    
    async ensureDirectory(filepath) {
      this.trace("ensureDirectory", [filepath]);
      const pathParts = filepath.split("/").filter(file => file.trim() !== "");
      const directoryParts = [].concat(pathParts);
      const filename = directoryParts.pop();
      let currentPathPart = "";
      for (let index = 0; index < directoryParts.length; index++) {
        const pathPart = directoryParts[index];
        currentPathPart += "/" + pathPart;
        const existsSubpath = await this.exists(currentPathPart);
        if (!existsSubpath) {
          await this.make_directory(currentPathPart);
        }
      }
      const filepath2 = currentPathPart + "/" + filename;
      const existsFilepath2 = await this.exists(filepath2);
      if (!existsFilepath2) {
        await this.make_directory(filepath2);
      }
    }

    async evaluateAsJavascriptFile(filepath, scope = undefined) {
      this.trace("evaluateAsJavascriptFile", [filepath]);
      const fileContents = await this.read_file(filepath);
      const AsyncFunction = (async function() {}).constructor;
      const asyncFunction = new AsyncFunction(fileContents);
      console.log("[*] Evaluating file as js:", asyncFunction.toString());
      const result = await asyncFunction.call(scope);
      return result;
    }

    evaluateAsJavascriptFileOrReturn(filepath, output = null, scope = undefined) {
      this.trace("evaluateAsJavascriptFileOrReturn", [filepath]);
      return this.evaluateAsJavascriptFile(filepath, scope).catch(error => {
        console.log("[!] Error evaluating file", error);
        return output;
      });
    }

    evaluateAsDotenvText(fileContents) {
      this.trace("evaluateAsDotenvText", []);
      const result = fileContents.split(/\n/).filter(line => line.trim() !== "").reduce((output, line) => {
        const [ id, value = "" ] = line.split(/\=/);
        output[id.trim()] = (value || "").trim();
        return output;
      }, {});
      return result;
    }

    async evaluateAsDotenvFile(filepath) {
      this.trace("evaluateAsDotenvFile", [filepath]);
      const fileContents = await this.read_file(filepath);
      return this.evaluateAsDotenvText(fileContents);
    }

    evaluateAsDotenvFileOrReturn(filepath, output = {}) {
      this.trace("evaluateAsDotenvFileOrReturn", [filepath]);
      return this.evaluateAsDotenvFile(filepath).catch(error => {
        console.log("[!] Error evaluating file (as .env):", error);
        return output;
      });
    }

    async evaluateAsTripiFile(filepath) {
      this.trace("evaluateAsTripiFile", [filepath]);
      const fileContents = await this.read_file(filepath);
      const result = LswTreeParser.parse(fileContents);
      return result;
    }

    async evaluateAsTripiFileOrReturn(filepath, output = {}) {
      this.trace("evaluateAsTripiFileOrReturn", [filepath]);
      try {
        const fileContents = await this.read_file(filepath);
        const result = LswTreeParser.parse(fileContents);
        return result;
      } catch (error) {
        console.log("[!] Error evaluating file (as .tri):", error);
        return output;
      }
    }

  }

  return LswFilesystem;

});