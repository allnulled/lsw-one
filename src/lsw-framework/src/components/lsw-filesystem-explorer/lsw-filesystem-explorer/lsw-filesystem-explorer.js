// @code.start: LswFilesystemExplorer API | @$section: Vue.js (v2) Components » Lsw Filesystem Explorer API » LswFilesystemExplorer component
Vue.component("LswFilesystemExplorer", {
  name: "LswFilesystemExplorer",
  template: $template,
  props: {
    absoluteLayout: {
      type: Boolean,
      default: () => false,
    },
    openedBy: {
      type: String,
      default: () => "/",
    }
  },
  data() {
    this.$trace("lsw-filesystem-explorer.data");
    return {
      is_ready: false,
      current_node: "/",
      current_node_parts: undefined,
      current_node_basename: undefined,
      current_node_basedir: undefined,
      current_node_contents: undefined,
      current_node_subnodes: [],
      current_node_is_file: false,
      current_node_is_directory: false,
      STANDARIZED_REFRESH_DELAY: 100
    };
  },
  methods: {
    open(...args) {
      this.$trace("lsw-filesystem-explorer.methods.open");
      return this.open_node(...args);
    },
    goUp() {
      this.$trace("lsw-filesystem-explorer.methods.goUp");
      const parts = this.current_node.split("/");
      parts.pop();
      const dest = this.normalize_path("/" + parts.join("/"));
      return this.open(dest);
    },
    async refresh() {
      this.$trace("lsw-filesystem-explorer.methods.refresh");
      this.is_ready = false;
      try {
        await this.open(this.current_node);
      } catch (error) {
        throw error;
      } finally {
        this.$nextTick(() => {
          this.is_ready = true;
          this.$forceUpdate(true);
        });
      }
    },
    normalize_path(subpath) {
      this.$trace("lsw-filesystem-explorer.methods.normalize_path");
      return this.$lsw.fs.resolve_path(this.current_node, subpath);
    },
    async open_node(subpath = this.current_node) {
      this.$trace("lsw-filesystem-explorer.methods.open_node");
      try {
        if (["", "/"].indexOf(subpath) !== -1) {
          return await this._openDirectory("/");
        }
        const temporaryPath = this.normalize_path(subpath);
        const is_directory = await this.$lsw.fs.is_directory(temporaryPath);
        if (is_directory) {
          return await this._openDirectory(temporaryPath);
        }
        const is_file = await this.$lsw.fs.is_file(temporaryPath);
        if (is_file) {
          return await this._openFile(temporaryPath);
        }
        throw new Error(`Cannot open path because it does not exist: ${temporaryPath} on «LswFilesystemExplorer.methods.open_node»`);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async processToCreateFile() {
      this.$trace("lsw-filesystem-explorer.methods.processToCreateFile");
      const filename = await this.$lsw.dialogs.open({
        title: "Crear fichero",
        template: `<div>
          <div class="pad_1">
            <div>Estás en la carpeta:</div>
            <div class="pad_2">{{ current_directory }}</div>
            <div>Di el nombre del nuevo fichero:</div>
            <div class="pad_top_1">
              <input class="width_100" type="text" placeholder="myfile.txt" v-model="filename" v-focus v-on:keyup.enter="() => accept(filename)" />
            </div>
          </div>
          <hr />
          <div class="flex_row centered pad_1">
            <div class="flex_100"></div>
            <div class="flex_1 pad_right_1">
              <button class="supermini nowrap danger_button" v-on:click="() => accept(filename)">Crear fichero</button>
            </div>
            <div class="flex_1">
              <button class="supermini nowrap " v-on:click="() => accept(false)">Cancelar</button>
            </div>
          </div>
        </div>`,
        factory: {
          data() {
            return {
              current_directory: this.$lsw.fs.get_current_directory(),
              filename: "",
            };
          },
        },
      });
      if (!filename) return;
      const filepath = this.$lsw.fs.resolve_path(this.$lsw.fs.get_current_directory(), filename);
      await this.$lsw.fs.write_file(filepath, "");
      this.refresh();
    },
    async processToCreateDirectory() {
      this.$trace("lsw-filesystem-explorer.methods.processToCreateDirectory");
      const filename = await this.$lsw.dialogs.open({
        title: "Crear directorio",
        template: `<div>
          <div class="pad_1">
            <div>Estás en la carpeta:</div>
            <div class="pad_2">{{ current_directory }}</div>
            <div>Di el nombre del nuevo directorio:</div>
            <div class="pad_top_1">
              <input class="width_100" type="text" placeholder="myfolder" v-model="filename" v-focus v-on:keyup.enter="() => accept(filename)" />
            </div>
          </div>
          <hr />
          <div class="flex_row centered pad_1">
            <div class="flex_100"></div>
            <div class="flex_1 pad_right_1">
              <button class="supermini nowrap danger_button" v-on:click="() => accept(filename)">Sí, seguro</button>
            </div>
            <div class="flex_1">
              <button class="supermini nowrap " v-on:click="() => accept(false)">Cancelar</button>
            </div>
          </div>
        </div>`,
        factory: {
          data() {
            return {
              current_directory: this.$lsw.fs.get_current_directory(),
              filename: "",
            };
          },
        },
      });
      if (!filename) return;
      const filepath = this.$lsw.fs.resolve_path(this.$lsw.fs.get_current_directory(), filename);
      await this.$lsw.fs.make_directory(filepath);
      this.refresh();
    },
    async processToDeleteDirectory() {
      this.$trace("lsw-filesystem-explorer.methods.processToDeleteDirectory");
      const confirmation = await this.$lsw.dialogs.open({
        title: "Eliminar directorio",
        template: `<div>
          <div class="pad_1">
            <div>¿Seguro que quieres eliminar el directorio?</div>
            <div class="pad_2">{{ current_directory }}</div>
          </div>
          <hr />
          <div class="flex_row centered pad_1">
            <div class="flex_100"></div>
            <div class="flex_1 pad_right_1">
              <button class="supermini nowrap danger_button" v-on:click="() => accept(true)">Sí, seguro</button>
            </div>
            <div class="flex_1">
              <button class="supermini nowrap " v-on:click="() => accept(false)">Cancelar</button>
            </div>
          </div>
        </div>`,
        factory: {
          data: {
            current_directory: this.$lsw.fs.get_current_directory(),
          }
        }
      });
      if (!confirmation) return;
      await this.$lsw.fs.delete_directory(this.$lsw.fs.get_current_directory());
      this.refresh();
    },
    async processToDeleteFile() {
      this.$trace("lsw-filesystem-explorer.methods.processToDeleteFile");
      const confirmation = await this.$lsw.dialogs.open({
        title: "Eliminar fichero",
        template: `<div>
          <div class="pad_1">
            <div>¿Seguro que quieres eliminar el fichero?</div>
            <div class="pad_2">{{ current_file }}</div>
          </div>
          <hr />
          <div class="flex_row centered pad_1">
            <div class="flex_100"></div>
            <div class="flex_1 pad_right_1">
              <button class="supermini nowrap danger_button" v-on:click="() => accept(true)">Sí, seguro</button>
            </div>
            <div class="flex_1">
              <button class="supermini nowrap " v-on:click="() => accept(false)">Cancelar</button>
            </div>
          </div>
        </div>`,
        factory: {
          data: {
            current_file: this.current_node,
          }
        }
      });
      if (!confirmation) return;
      await this.$lsw.fs.delete_file(this.current_node);
      const upperDir = (() => {
        const parts = this.current_node.split("/");
        parts.pop();
        return parts.join("/");
      })();
      this.refresh();
    },
    async processToRenameFile() {
      this.$trace("lsw-filesystem-explorer.methods.processToRenameFile");
      const elementType = this.current_node_is_file ? "fichero" : "directorio";
      const newName = await this.$lsw.dialogs.open({
        title: "Renombrar " + elementType,
        template: `<div>
          <div class="pad_1">
            <div>Refiriéndose al {{ elementType }}:</div>
            <div class="pad_2">{{ filename }}</div>
          </div>
          <div class="pad_1">
            <div>Di el nuevo nombre del {{ elementType }}:</div>
            <div class="pad_top_1">
              <input v-focus class="width_100" type="text" placeholder="Nuevo nombre aquí" v-model="new_filename" v-on:keyup.enter="() => accept(new_filename)" />
            </div>
          </div>
          <hr />
          <div class="flex_row centered">
            <div class="flex_100"></div>
            <div class="flex_1 pad_right_1">
              <button class="supermini nowrap danger_button" v-on:click="() => accept(new_filename)">Sí, seguro</button>
            </div>
            <div class="flex_1">
              <button class="supermini nowrap " v-on:click="() => accept(false)">Cancelar</button>
            </div>
          </div>
        </div>`,
        factory: {
          data: {
            elementType,
            filename: this.current_node,
            new_filename: this.current_node.split("/").pop(),
          }
        }
      });
      if (newName === false) return;
      if (newName.trim() === "") return;
      const allParts = this.current_node.split("/");
      allParts.pop();
      const dirPath = "/" + allParts.join("/");
      const newFullpath = this.$lsw.fs.resolve_path(dirPath, newName);
      await this.$lsw.fs.rename(this.current_node, newName.replace(/^\/+/g, ""));
      await this.open(newFullpath);
    },
    async processToExecuteFile() {
      this.$trace("lsw-filesystem-explorer.methods.processToExecuteFile");
      const editorContents = this.$refs.editor.getContents();
      const AsyncFunction = (async function () { }).constructor;
      const asyncFunction = new AsyncFunction(editorContents);
      try {
        await asyncFunction.call(this);
      } catch (error) {
        this.$lsw.toasts.send({
          title: "Error arised when executing file",
          text: `File ${this.current_node} produced following error: ${error.name}: ${error.message}`
        });
      }
    },
    async processToLoadFile() {
      this.$trace("lsw-filesystem-explorer.methods.processToLoadFile");
      this.is_ready = false;
      const contents = await this.$lsw.fs.read_file(this.current_node);
      this.current_node_contents = contents;
      this.$nextTick(() => {
        this.is_ready = true;
      });
    },
    async processToSaveFile() {
      this.$trace("lsw-filesystem-explorer.methods.processToSaveFile");
      if (this.$refs.editor) {
        const editorContents = this.$refs.editor.getContents();
        console.log(this.current_node, editorContents);
        await this.$lsw.fs.write_file(this.current_node, editorContents);
      }
    },
    _setButtonsForFile() {
      this.$trace("lsw-filesystem-explorer.methods._setButtonsForFile");
      this.is_ready = false;
      this.current_node_is_file = true;
      this.current_node_is_directory = false;
      Setup_panel_top_on_file: {
        this.$refs.panelTop.setButtons({
          text: "➜",
          classes: "reversed",
          click: () => this.goUp(),
        });
      }
      Setup_panel_right_on_file: {
        const rightButtonsOnFile = [
          {
            text: "💾",
            click: () => this.processToSaveFile(),
          }, {
            text: "↔️",
            click: () => this.processToRenameFile(),
          }, {
            text: "🔄",
            click: () => this.processToLoadFile(),
          }, {
            text: "📄 🔥",
            classes: "danger_button",
            click: () => this.processToDeleteFile(),
          }
        ];
        // @INJECTABLE: add custom buttons for extensions:
        if (this.current_node.endsWith(".js")) {
          // @BUTTON to execute JavaScript:
          rightButtonsOnFile.push({
            text: "⚡️",
            classes: "danger_button",
            click: () => this.processToExecuteFile(),
          });
        }
        this.$refs.panelRight.setButtons(...rightButtonsOnFile);
      }
      Setup_panel_bottom_on_file: {
        const bottomButtonsOnFile = [
          {
            text: "➕",
            click: () => this.increaseFontsize(),
          }, {
            text: "➖",
            click: () => this.decreaseFontsize(),
          }, {
            text: "✍🏻|💻",
            click: () => this.toggleFontfamily(),
          }
        ];
        // @INJECTABLE: add custom buttons for extensions:
        if (this.current_node.endsWith(".js")) {
          // @OK
        }
        this.$refs.panelBottom.setButtons(...bottomButtonsOnFile);
      }
      this.$nextTick(() => {
        this.is_ready = true;
      });
    },
    _setButtonsForDirectory() {
      this.$trace("lsw-filesystem-explorer.methods._setButtonsForDirectory");
      this.is_ready = false;
      this.current_node_is_directory = true;
      this.current_node_is_file = false;
      Setup_panel_top_on_directory: {
        if (this.current_node === "/") {
          this.$refs.panelTop.setButtons();
        } else {
          this.$refs.panelTop.setButtons({
            text: "➜",
            classes: "reversed",
            click: () => this.goUp(),
          });
        }
      }
      Setup_panel_right_on_directory: {
        this.$refs.panelRight.setButtons({
          text: "📄+",
          click: () => this.processToCreateFile(),
        }, {
          text: "📁+",
          click: () => this.processToCreateDirectory(),
        }, {
          text: "📁 🔥",
          classes: "danger_button",
          click: () => this.processToDeleteDirectory()
        });
      }
      Setup_panel_bottom_on_directory: {
        this.$refs.panelBottom.setButtons();
      }
      this.$nextTick(() => {
        this.is_ready = true;
      });
    },
    increaseFontsize() {
      this.$trace("lsw-filesystem-explorer.methods.increaseFontsize");
      this.$refs.editor.increaseFontsize();
    },
    decreaseFontsize() {
      this.$trace("lsw-filesystem-explorer.methods.decreaseFontsize");
      this.$refs.editor.decreaseFontsize();
    },
    toggleFontfamily() {
      this.$trace("lsw-filesystem-explorer.methods.toggleFontfamily");
      this.$refs.editor.toggleFontfamily();
    },
    async _openFile(subpath) {
      this.$trace("lsw-filesystem-explorer.methods._openFile");
      this.current_node = subpath;
      const contents = await this.$lsw.fs.read_file(this.current_node);
      this.current_node_contents = contents;
      this._setButtonsForFile();
    },
    async _openDirectory(subpath) {
      this.$trace("lsw-filesystem-explorer.methods._openDirectory");
      this.current_node = subpath;
      const subnodes = await this.$lsw.fs.read_directory(this.current_node);
      const sortedSubnodes = {
        files: [],
        folders: []
      };
      Object.keys(subnodes).forEach(id => {
        const subnode = subnodes[id];
        const subnodeType = typeof subnode === "string" ? "files" : "folders";
        sortedSubnodes[subnodeType].push(id);
      });
      const formattedSubnodes = {};
      sortedSubnodes.folders.sort().forEach(folder => {
        formattedSubnodes[folder] = {};
      });
      sortedSubnodes.files.sort().forEach(file => {
        formattedSubnodes[file] = "...";
      });
      console.log(subnodes, formattedSubnodes);
      this.$lsw.fs.change_directory(subpath);
      this.current_node_subnodes = formattedSubnodes;
      this._setButtonsForDirectory();
    },
    __update_node_parts(newValue = this.current_node) {
      this.$trace("lsw-filesystem-explorer.methods.__update_node_parts");
      this.current_node_parts = newValue.split("/").filter(p => p !== "");
    },
    __update_current_node_basename(current_node_parts = this.current_node_parts) {
      this.$trace("lsw-filesystem-explorer.methods.__update_current_node_basename");
      if (current_node_parts.length) {
        this.current_node_basename = current_node_parts[current_node_parts.length - 1];
      } else {
        this.current_node_basename = "/";
      }
    },
    __update_current_node_basedir(current_node_parts = this.current_node_parts) {
      this.$trace("lsw-filesystem-explorer.methods.__update_current_node_basedir");
      if (current_node_parts.length > 1) {
        this.current_node_basedir = "/" + [].concat(current_node_parts).splice(0, current_node_parts.length - 1).join("/") + "/";
      } else {
        this.current_node_basedir = "/";
      }
    },
    _updateNodeSubdata(newValue = this.current_node) {
      this.$trace("lsw-filesystem-explorer.methods._updateNodeSubdata");
      this.__update_node_parts(newValue);
      this.__update_current_node_basename();
      this.__update_current_node_basedir();
    },
    setPanelButtons(panelOptions = {}) {
      this.$trace("lsw-filesystem-explorer.methods.setPanelButtons");
      Validation: {
        if (typeof panelOptions !== "object") {
          throw new Error("Required argument «panelOptions» to be an object on «LswFilesystemExplorer.methods.setPanelButtons»");
        }
        const keys = Object.keys(panelOptions);
        if (keys.length === 0) {
          throw new Error("Required argument «panelOptions» to be have 1 or more keys on «LswFilesystemExplorer.methods.setPanelButtons»");
        }
        const valid_keys = ["top", "bottom", "left", "right"];
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index];
          if (valid_keys.indexOf(key) === -1) {
            throw new Error(`Required argument «panelOptions[${key}]» to be a valid key out of «${valid_keys.join(",")}», not «${key}» on «LswFilesystemExplorer.methods.setPanelButtons»`);
          }
          const value = panelOptions[key];
          if (typeof value !== "object") {
            throw new Error(`Required argument «panelOptions[${key}]» to be an object or array, not ${typeof value}» on «LswFilesystemExplorer.methods.setPanelButtons»`);
          }
        }
      }
    },
    async initializeFilesystemForLsw() {
      /*
      const DEFAULT_ACCIONES = {
        "Trackeo de números de conducta/agenda": [{ porcion: 500 }],
        "Trackeo de conceptos/relaciones": [{ porcion: 500 }],
        "Trackeo de ideas/notas": [{ porcion: 1 }],
        "Programación de interfaces gráficas": [{ porcion: 500 }],
        "Arquitectura por patrones": [{ porcion: 200 }],
        "Arquitectura de la realidad": [{ porcion: 200 }],
        "Arquitectura del yo": [{ porcion: 200 }],
        "Lenguajes formales": [{ porcion: 1 }],
        "Investigación de cocina/nutrición/química": [{ porcion: 200 }],
        "Investigación de nutrición": [{ porcion: 1 }],
        "Investigación de química": [{ porcion: 1 }],
        "Investigación de física": [{ porcion: 1 }],
        "Investigación de matemáticas": [{ porcion: 1 }],
        "Investigación de geometría": [{ porcion: 1 }],
        "Investigación de canvas/perspectiva": [{ porcion: 1 }],
        "Investigación de medicina/biología/fisiología": [{ porcion: 100 }],
        "Investigación de musculación/flexibilidad": [{ porcion: 100 }],
        "Investigación de las emociones": [{ porcion: 100 }],
        "Cocinar/Comer": [{ cada: "6h", minimo: "1h" }],
        "Pasarlo bien con la perrillo": [{ cada: "6h", minimo: "1h" }],
        "Cuidados de plantas": [{ porcion: 1 }],
        "Cuidados del hogar": [{ porcion: 1 }],
        "Actividad física": [{ porcion: 500 }, { nunca_despues_de: "comer", durante: "2h" }, { cada: "24h", minimo: "20min" }],
        "Optimización de RAM": [{ porcion: 500 }],
        "Autocontrol/Autobservación/Autoanálisis": [{ porcion: 500 }],
        "Meditación/Relajación": [{ porcion: 500 }],
        "Paisajismo": [{ cada: "3h", minimo: "20min" }],
        "Dibujo 3D/Perspectiva/Geometría/Mates": [{ porcion: 1 }],
        "Dibujo artístico/anime/abstracto/esquemista/conceptualista": [{ porcion: 1 }],
        "Reflexión/Diálogo interno": [{ porcion: 500 }],
      };
      //*/
      await this.$lsw.fs.ensureFile("/kernel/settings/rutiner.md", `

Piensa en cosas bonitas

- Cosas bonitas
- Cosas bonitas
- Cosas bonitas
- Más cosas bonitas
- Más cosas más bonitas
- Más todavía

`.trim());
      await this.$lsw.fs.ensureFile("/kernel/settings/randomizables.env", `

Trackeo de números de conducta/agenda = 1
Trackeo de conceptos/relaciones = 1
Trackeo de ideas/notas = 1
Programación de interfaces gráficas = 1
Arquitectura por patrones = 1
Arquitectura de la realidad = 1
Arquitectura del yo = 1
Lenguajes formales = 1
Investigación de cocina/nutrición/química = 1
Investigación de nutrición = 1
Investigación de química = 1
Investigación de física = 1
Investigación de matemáticas = 1
Investigación de geometría = 1
Investigación de canvas/perspectiva = 1
Investigación de medicina/biología/fisiología = 1
Investigación de musculación/flexibilidad = 1
Investigación de las emociones = 1
Actividad física = 1
Optimización de RAM = 1
Autocontrol/Autobservación/Autoanálisis = 1
Meditación/Relajación = 1
Paisajismo = 1
Dibujo 3D/Perspectiva/Geometría/Mates = 1
Dibujo artístico/anime/abstracto/esquemista/conceptualista = 1
Reflexión/Diálogo interno = 1

`.trim());
      await this.$lsw.fs.ensureFile("/kernel/settings/backgrounds.env", `

assets/images/montania1.png
assets/images/playa1.png
assets/images/playa2.png

`.trim());
      await this.$lsw.fs.ensureFile("/kernel/settings/automessages.env", `

Sé tu propia luz.
Lo conseguiremos.
Todo se andará.
Sigamos adelante.
En algún momento encontraremos la luz.

`.trim());
      await this.$lsw.fs.ensureFile("/kernel/wiki/libros/Boot.tri", `

@{
  "categorias": [],
  "asco": [],
  "de": [],
  "persona": [],
  "universal": "ok"
}
Boot [Artículo para el boot] {
  @{
    "autor": "github.com/allnulled",
    "mensaje": "Dios, métete tu puto universo por tu puto culo de rata malnacida, no?",
    "año": 2025
  }
  Capitulo 1 {}
  Otro más nuevo [Otro más nuevo] {
    Parte 1 [Capitulo 2/Parte 1] {}
    Parte 2 [Capitulo 2/Parte 2] {}
    Parte 3 [Capitulo 2/Parte 3] {}
    Parte 4 [Capitulo 2/Parte 4] {}
    Parte 5 [Capitulo 2/Parte 5] {}
  }
  Capítulo 3 [] {
    Parte 1 [Capitulo 2/Parte 1] {}
    Parte 2 [Capitulo 2/Parte 2] {}
    Parte 3 [Capitulo 2/Parte 3] {}
    Parte 4 [Capitulo 2/Parte 4] {}
    Parte 5 [Capitulo 2/Parte 5] {}
  }
  Capítulo 4 [] {
    Parte 1 [Capitulo 2/Parte 1] {}
    Parte 2 [Capitulo 2/Parte 2] {}
    Parte 3 [Capitulo 2/Parte 3] {}
    Parte 4 [Capitulo 2/Parte 4] {}
    Parte 5 [Capitulo 2/Parte 5] {}
  }
  Capítulo 5 [] {
    Parte 1 [Capitulo 2/Parte 1] {}
    Parte 2 [Capitulo 2/Parte 2] {}
    Parte 3 [Capitulo 2/Parte 3] {}
    Parte 4 [Capitulo 2/Parte 4] {}
    Parte 5 [Capitulo 2/Parte 5] {}
  }
  Capítulo 6 [] {
    Parte 1 [Capitulo 2/Parte 1] {}
    Parte 2 [Capitulo 2/Parte 2] {}
    Parte 3 [Capitulo 2/Parte 3] {}
    Parte 4 [Capitulo 2/Parte 4] {}
    Parte 5 [Capitulo 2/Parte 5] {}
  }
}
  
`.trim());
await this.$lsw.fs.ensureFile("/kernel/wiki/categorias.tri", `

Árbol de categorías [] {
  Biología [] {
    Vegetal [] {}
    Animal [] {}
    Social [] {}
  }
  Medicina [] {
    Fisiología [] {}
    Nutrición [] {}
  }
  Química [] {}
  Física [] {}
  Matemáticas [] {
    Programación [] {}
    Lógica abstracta [] {}
  }
  Arte [] {}
}

`.trim());
await this.$lsw.fs.ensureFile("/kernel/agenda/report/inicio.js", `

const conceptos = await lsw.database.selectMany("Concepto");
const acciones = await lsw.database.selectMany("Accion");
const acciones_virtuales = await lsw.database.selectMany("Accion_virtual");
const propagadores = await lsw.database.selectMany("Propagador_de_concepto");
const prototipos = await lsw.database.selectMany("Propagador_prototipo");
const acumulaciones_objeto = acciones_virtuales.reduce((out, it) => {
  if(!(it.en_concepto in out)) {
    out[it.en_concepto] = 0;
  }
  out[it.en_concepto] += (LswTimer.utils.fromDurationstringToMilliseconds(it.tiene_duracion) || 0);
  return out;
}, {});
const acumulaciones = Object.keys(acumulaciones_objeto).sort((k1, k2) => {
  const c1 = acumulaciones_objeto[k1];
  const c2 = acumulaciones_objeto[k2];
  return c2 > c1 ? 1 : -1;
}).map(id => {
  const ms = acumulaciones_objeto[id];
  return {
    nombre: id,
    total: LswTimer.utils.fromMillisecondsToDurationstring(ms)
  };
});

return {
  "Acumulaciones virtuales": acumulaciones,
  "Conceptos": conceptos,
  "Acciones": acciones,
  "Acciones virtuales": acciones_virtuales,
  "Propagadores": propagadores,
  "Propagadores prototipo": prototipos,
};

`.trim());
      await this.$lsw.fs.ensureFile("/kernel/agenda/proto/boot.proto", `

inc /kernel/agenda/proto/concepto
inc /kernel/agenda/proto/funcion
inc /kernel/agenda/proto/relacion

def desayunar, comer, cenar

fun unEjemplo: param1, param2 {
  console.log("Solo un ejemplo.");
}

rel desayunar
  > consumir * 1
  > abstenerse * 0
  >> unEjemplo: 500, 1000

`.trim());
      await this.$lsw.fs.ensureDirectory("/kernel/agenda/proto/concepto");
      await this.$lsw.fs.ensureDirectory("/kernel/agenda/proto/funcion");
      await this.$lsw.fs.ensureDirectory("/kernel/agenda/proto/relacion");
      await this.$lsw.fs.ensureFile("/kernel/agenda/proto/funcion/multiplicador.js", `
        
      `.trim());
      await this.$lsw.fs.ensureDirectory("/kernel/settings/table/storage");
      await this.$lsw.fs.ensureDirectory("/kernel/components");
      await this.$lsw.fs.ensureFile("/kernel/boot.js", `

// Cuidadito con este script que te cargas la app
// y luego tienes que borrar la caché para volver a tenerla.
        
        `.trim());
    }
  },
  watch: {
    current_node(newValue) {
      this.$trace("lsw-filesystem-explorer.watch.current_node");
      this._updateNodeSubdata(newValue);
    }
  },
  async mounted() {
    try {
      this.$trace("lsw-filesystem-explorer.mounted");
      this.$lsw.fsExplorer = this;
      await this.initializeFilesystemForLsw();
      await this.open(this.openedBy ?? "/");
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswFilesystemExplorer API