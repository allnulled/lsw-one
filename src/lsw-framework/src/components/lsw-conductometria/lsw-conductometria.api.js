(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswConductometria'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswConductometria'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const LswConductometria = class {

    static create(...args) {
      Vue.prototype.$trace("LswConductometria.create");
      return new this(...args);
    }

    constructor(options = {}) {
      Vue.prototype.$trace("lswConductometria.constructor");
    }

    async reload(component) {
      Vue.prototype.$trace("lswConductometria.reload");
      const virtualization = new LswConductometriaVirtualization(component);
      await virtualization.$resetVirtualTables();
      await virtualization.$reloadProtolangScriptBoot();
      await virtualization.$virtualizePropagations();
    }

  }

  const LswConductometriaVirtualization = class {

    static create(...args) {
      Vue.prototype.$trace("LswConductometriaVirtualization.create");
      return new this(...args);
    }

    constructor(component) {
      this.$component = component;
    }

    reportErrorFromComponent(error) {
      Vue.prototype.$trace("lswConductometriaVirtualization.reportErrorFromComponent");
      console.log(error);
      if(this.$component && (typeof this.$component.addError === "function")) {
        this.$component.addError(error);
      }
    }

    async $resetVirtualTables() {
      Vue.prototype.$trace("lswConductometriaVirtualization.$resetVirtualTables");
      await Vue.prototype.$lsw.database.deleteMany("Accion_virtual", it => true);
      await Vue.prototype.$lsw.database.deleteMany("Propagador_prototipo", it => true);
      await Vue.prototype.$lsw.database.deleteMany("Propagador_de_concepto", it => true);
    }

    async $reloadProtolangScriptBoot() {
      Vue.prototype.$trace("lswConductometriaVirtualization.$reloadProtolangScriptBoot");
      const protoSource = await Vue.prototype.$lsw.fs.read_file("/kernel/agenda/proto/boot.proto");
      return await this.$evaluateProtolangScript(protoSource, {
        sourcePath: "/kernel/agenda/script/boot.proto"
      });
    }

    async $evaluateProtolangScript(source, parameters) {
      Vue.prototype.$trace("lswConductometriaVirtualization.$evaluateProtolangScript");
      const ast = Vue.prototype.$lsw.parsers.proto.parse(source, {
        options: parameters
      });
      for (let index = 0; index < ast.length; index++) {
        const sentence = ast[index];
        if (sentence.type === "inc") {
          await this.$evaluateInclude(sentence);
        } else if (sentence.type === "def") {
          await this.$evaluateDefine(sentence);
        } else if (sentence.type === "fun") {
          await this.$evaluateFunction(sentence);
        } else if (sentence.type === "rel") {
          await this.$evaluateRelation(sentence);
        }
      }
    }

    async $evaluateInclude(sentence) {
      Vue.prototype.$trace("lswConductometriaVirtualization.$evaluateInclude");
      let isFile = undefined;
      let isDirectory = undefined;
      const allFiles = [];
      const filepath = sentence.path;
      Read_node: {
        isFile = await Vue.prototype.$lsw.fs.is_file(filepath);
        isDirectory = await Vue.prototype.$lsw.fs.is_directory(filepath);;
        if (isFile) {
          console.log("[*] Reading file: ", filepath);
          const contents = await Vue.prototype.$lsw.fs.read_file(filepath);
          allFiles.push({
            incBy: sentence,
            file: filepath,
            contents: contents
          });
        } else if (isDirectory) {
          console.log("[*] Reading directory: ", filepath);
          const subfilesMap = await Vue.prototype.$lsw.fs.read_directory(filepath);
          const subfiles = Object.keys(subfilesMap);
          Iterating_subfiles:
          for (let indexSubfile = 0; indexSubfile < subfiles.length; indexSubfile++) {
            const subfile = subfiles[indexSubfile];
            const subfilepath = Vue.prototype.$lsw.fs.resolve_path(filepath, subfile);
            const is_file = await Vue.prototype.$lsw.fs.is_file(subfilepath);
            if (!is_file) {
              continue Iterating_subfiles;
            }
            console.log("[*] Reading subfile: ", subfilepath);
            const filecontents = await Vue.prototype.$lsw.fs.read_file(subfilepath);
            allFiles.push({
              incBy: sentence,
              file: subfilepath,
              contents: filecontents
            });
          }
        } else {
          throw new Error(`File does not exits «${filepath}» on «lswConductometriaVirtualization.$evaluateInclude»`);
        }
      }
      console.log("[*] Evaluating all subfiles:", allFiles);
      Evaluate_subnodes: {
        for(let indexFile=0; indexFile<allFiles.length; indexFile++) {
          const metafile = allFiles[indexFile];
          const file = metafile.file;
          const contents = metafile.contents;
          await this.$evaluateProtolangScript(contents, {
            sourcePath: file
          });
        }
      }
    }

    async $evaluateDefine(sentence) {
      Vue.prototype.$trace("lswConductometriaVirtualization.$evaluateDefine");
      const { names } = sentence;
      // @TODO: insertar names en Concepto
      Iterating_names:
      for(let index=0; index<names.length; index++) {
        const name = names[index];
        try {
          await Vue.prototype.$lsw.database.insert("Concepto", {
            tiene_nombre: name,
          });
        } catch (error) {
          if(error.message === "Error on «browsie.insert» operation over store «Concepto»: A mutation operation in the transaction failed because a constraint was not satisfied.") {
            continue Iterating_names;
          }
          await this.reportErrorFromComponent(error);
        }
      }
    }

    async $evaluateFunction(sentence) {
      Vue.prototype.$trace("lswConductometriaVirtualization.$evaluateFunction");
      const { name, params, code } = sentence;
      // @TODO: insertar name+params+code en Propagador_prototipo
      try {
        await Vue.prototype.$lsw.database.insert("Propagador_prototipo", {
          tiene_nombre: name,
          tiene_parametros: JSON.stringify(params),
          tiene_funcion: code,
        });
      } catch (error) {
        await this.reportErrorFromComponent(error);
      }
    }

    async $evaluateRelation(sentence) {
      Vue.prototype.$trace("lswConductometriaVirtualization.$evaluateRelation");
      const { name, effects, triggers } = sentence;
      Iterating_effects:
      for(let indexEffect=0; indexEffect<effects.length; indexEffect++) {
        const effect = effects[indexEffect];
        const { concept, value } = effect;
        await Vue.prototype.$lsw.database.insert("Propagador_de_concepto", {
          tiene_propagador_prototipo: "multiplicador",
          tiene_concepto_origen: name,
          tiene_concepto_destino: concept,
          tiene_parametros_extra: value,
        });
      }
      Iterating_triggers:
      for(let indexTrigger=0; indexTrigger<triggers.length; indexTrigger++) {
        const trigger = triggers[indexTrigger];
        if(trigger.type === "trigger-by-call") {
          const { name: propagador, args } = trigger;
          await Vue.prototype.$lsw.database.insert("Propagador_de_concepto", {
            tiene_propagador_prototipo: propagador,
            tiene_concepto_origen: name,
            tiene_concepto_destino: LswUtils.extractFirstStringOr(args, ""),
            tiene_parametros_extra: args,
          });
        } else if(trigger.type === "trigger-by-code") {
          await Vue.prototype.$lsw.database.insert("Propagador_de_concepto", {
            tiene_propagador_prototipo: propagador,
            tiene_concepto_origen: name,
            tiene_concepto_destino: LswUtils.extractFirstStringOr(args, ""),
            tiene_parametros_extra: args,
            tiene_codigo: trigger.code
          });
        }
      }
    }

    $virtualizePropagations() {
      Vue.prototype.$trace("lswConductometriaVirtualization.$virtualizePropagations");

    }

  }

  return LswConductometria;

});