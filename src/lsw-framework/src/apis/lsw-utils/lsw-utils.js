(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  // @code.start: LswUtils | @section: Lsw Utils API » Lsw Utils global
  const LswUtils = {};

  LswUtils.hello = () => console.log("Hello!");

  ///////////////////////////////////////////////////////
  // API de Excel: usa SheetJS
  Object.assign(LswUtils, {
    readFileAsArrayBuffer(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsArrayBuffer(file);
      });
    },
    readFileAsText(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
      });
    },
    readFileAsBinaryString(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsBinaryString(file);
      });
    },
    selectFile() {
      return new Promise(resolve => {
        const inputHtml = document.createElement("input");
        inputHtml.setAttribute("type", "file");
        inputHtml.setAttribute("accept", ".ods,.xlsx,.xls,.csv");
        inputHtml.style.display = "none";
        document.body.appendChild(inputHtml);
        inputHtml.addEventListener("change", event => {
          try {
            const file = event.target.files[0];
            if (file) {
              return resolve(file);
            } else {
              return resolve(undefined);
            }
          } catch (error) {
            console.log("This should not happen :(", error);
          } finally {
            inputHtml.remove();
          }
        });
        inputHtml.click();
      });
    },
    sheetToArray(sheet) {
      // Obtener el rango de celdas activo de la hoja
      const range = sheet['!ref']; // Ejemplo: 'A1:C3'
      // Extraer las coordenadas de la celda inicial y final del rango
      const [startCell, endCell] = range.split(':');
      const startCol = startCell.match(/[A-Z]+/)[0]; // Columna de la primera celda (por ejemplo, 'A')
      const startRow = parseInt(startCell.match(/\d+/)[0], 10); // Fila de la primera celda (por ejemplo, 1)
      const endCol = endCell.match(/[A-Z]+/)[0]; // Columna de la última celda (por ejemplo, 'C')
      const endRow = parseInt(endCell.match(/\d+/)[0], 10); // Fila de la última celda (por ejemplo, 3)
      const data = [];
      // Iterar sobre las filas y columnas dentro del rango
      for (let row = startRow; row <= endRow; row++) {
        const rowData = [];
        for (let col = startCol.charCodeAt(0); col <= endCol.charCodeAt(0); col++) {
          const cellAddress = String.fromCharCode(col) + row;
          const cell = sheet[cellAddress]; // Obtener la celda
          rowData.push(cell ? cell.v : null); // Si la celda existe, tomar su valor. Si no, agregar `null`
        }
        data.push(rowData); // Agregar la fila al array de datos
      }
      return data;
    }
  });

  ///////////////////////////////////////////////////////
  // API de Conductometria: usa API de Excel (so: SheetJS)
  Object.assign(LswUtils, {
    isDatePassed(date, time, currentDate = new Date()) {
      const [day, month, year] = date.split("/").map(Number);
      const [hour, minute, second] = time.split(":").map(Number);
      const targetDate = new Date(year, month - 1, day, hour, minute, second);
      return currentDate > targetDate;
    },
    sheetToRegistros(sheet, asObjectIsOkay = false) {
      const raw = this.sheetToArray(sheet);
      const byDate = {};
      let lastDate = undefined;
      const currentDate = new Date();
      Compact_by_date_using_last_date: {
        for (let index = 0; index < raw.length; index++) {
          const cells = raw[index];
          const [time, content] = cells;
          const isDate = time.match(/[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g);
          if (isDate) {
            if (!(time in byDate)) {
              byDate[time] = {};
            }
            lastDate = time;
          } else {
            if (typeof content === "string") {
              if (!(time in byDate[lastDate])) {
                byDate[lastDate][time] = [];
              }
              Add_properties_to_hour: {
              }
              const items = content.split(".").filter(l => l !== "");
              for (let indexItem = 0; indexItem < items.length; indexItem++) {
                const item = items[indexItem];
                const [name, details] = item.split(":").filter(l => l !== "");
                let event = {};
                Add_properties_to_event: {
                  Object.assign(event, { name });
                  Object.assign(event, details ? { details: details.trim() } : {});
                }
                byDate[lastDate][time].push(event);
              }
            }
          }
        }
      }
      if (asObjectIsOkay) {
        return byDate;
      }
      const output = [];
      Format_to_pure_array_to_avoid_confusions: {
        const daysSorted = Object.keys(byDate).sort();
        for (let index_day = 0; index_day < daysSorted.length; index_day++) {
          const day_id = daysSorted[index_day];
          const day_data = byDate[day_id];
          const day_output = {
            day: day_id,
            hours: []
          };
          const hoursSorted = Object.keys(day_data).sort();
          for (let index_hour = 0; index_hour < hoursSorted.length; index_hour++) {
            const hour_id = hoursSorted[index_hour];
            const hour_data = day_data[hour_id];
            const hour_is_passed = this.isDatePassed(day_id, hour_id, currentDate);
            const hour_is_current = hour_is_passed && (() => {
              const [hours, minutes, seconds] = hour_id.split(":").map(Number);
              const hour_next_id = [hours + 1, minutes, seconds].map(t => ("" + t).padStart(2, "0")).join(":");
              console.log(hour_next_id);
              return !this.isDatePassed(day_id, hour_next_id, currentDate);
            })();
            const hour_output = {
              hour: hour_id,
              events: [],
              passed: hour_is_passed,
              current: hour_is_current,
            };
            for (let index_item = 0; index_item < hour_data.length; index_item++) {
              const item = hour_data[index_item];
              hour_output.events.push(item);
            }
            day_output.hours.push(hour_output);
          }
          output.push(day_output);
        }
      }
      return output;
    },
    async loadConductometriaByExcelFile() {
      try {
        const file = await this.selectFile();
        const data = await this.readFileAsBinaryString(file);
        const workbook = XLSX.read(data, { type: "binary", cellDates: false });
        const sheet = workbook.Sheets["Tracking"];
        const registros = this.sheetToRegistros(sheet);
        return { registros };
      } catch (error) {
        console.log(error);
      }
    },
  });

  // API de LSW:
  LswUtils.toPlainObject = function (obj) {
    const seen = new WeakSet();
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return undefined; // Ignora referencias circulares
        seen.add(value);
      }
      return value;
    }));
  };


  LswUtils.stringify = function (argInput, avoidedIndexes = []) {
    const seen = new WeakSet();
    return JSON.stringify(argInput, function (key, value) {
      if (avoidedIndexes.indexOf(key) !== -1) {
        return;
      }
      if (typeof value === "object") {
        if (value.$el) {
          return `[VueComponent:${value?.$options?.name}]`;
        }
        if (seen.has(value)) {
          return "[Circular]";
        }
        if (value !== null) {
          seen.add(value);
        }
      }
      return value;
    }, 2);
  };

  LswUtils.pluralizar = function (singular, plural, contexto, cantidad) {
    return contexto.replace("%s", cantidad === 1 ? singular : plural).replace("%i", cantidad);
  };

  LswUtils.getRandomString = function (len = 10) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let out = "";
    while (out.length < len) {
      out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return out;
  };

  LswUtils.hello = function () {
    console.log("hello");
  };

  LswUtils.waitForMilliseconds = function (ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };

  LswUtils.splitStringOnce = function (text, splitter) {
    if (typeof text !== "string") {
      throw new Error("Required parameter «text» to be a string on «LswUtils.splitStringOnce»");
    }
    if (typeof splitter !== "string") {
      throw new Error("Required parameter «text» to be a string on «LswUtils.splitStringOnce»");
    }
    const pos = text.indexOf(splitter);
    if (pos === -1) return [undefined, text];
    const parts = text.split("");
    return [[...parts].splice(0, pos).join(""), [...parts].splice(pos + 1).join("")];
  };

  LswUtils.reverseString = function (text) {
    return text.split("").reverse().join("");
  };

  LswUtils.capitalize = function (text) {
    return text.substr(0, 1).toUpperCase() + text.substr(1);
  };

  LswUtils.startThread = function (callback) {
    setTimeout(callback, 0);
  };

  LswUtils.openAddNoteDialog = async function () {
    const response = await Vue.prototype.$lsw.dialogs.open({
      title: "Nueva nota",
      template: `
        <div class="pad_1 position_absolute top_0 right_0 left_0 bottom_0 flex_column">
          <div class="flex_1">
            <input class="width_100" type="text" v-model="value.tiene_fecha" placeholder="Fecha de la nota" ref="fecha" />
          </div>
          <div class="flex_1 flex_row centered" style="padding-top: 1px;">
            <div class="flex_1">Estado: </div>
            <select class="flex_100" v-model="value.tiene_estado">
              <option value="creada">Creada</option>
              <option value="procesada">Procesada</option>
              <option value="dudosa">Dudosa</option>
              <option value="desestimada">Desestimada</option>
            </select>
          </div>
          <div class="flex_1" style="padding-top: 2px;">
            <input class="width_100" type="text" v-model="value.tiene_categorias" placeholder="categoría 1; categoria 2; categoria 3" />
          </div>
          <div class="flex_100" style="padding-top: 1px;">
            <textarea v-model="value.tiene_contenido" spellcheck="false" style="height: 100%;" placeholder="Contenido de la nota. Acepta **markdown**, recuerda." ref="contenido" />
          </div>
          <div class="flex_1" style="padding-top: 2px;">
            <input class="width_100" type="text" v-model="value.tiene_titulo" placeholder="Título de la nota" ref="titulo" />
          </div>
          <div class="flex_row pad_top_1">
            <div class="flex_100"></div>
            <div class="flex_1 flex_row">
              <div class="pad_right_1">
                <button class="mini" v-on:click="validate">➕ Añadir</button>
              </div>
            </div>
          </div>
        </div>
      `,
      factory: {
        methods: {
          validate() {
            const isValidFecha = LswTimer.parser.parse(this.value.tiene_fecha);
            const isValidContenido = this.value.tiene_contenido.trim() !== "";
            const isValidTitulo = this.value.tiene_titulo.trim() !== "";
            if (!isValidTitulo) {
              window.alert("Necesita un título la nota.");
              return this.$refs.titulo.focus();
            }
            if (!isValidContenido) {
              window.alert("Necesita un contenido la nota.");
              return this.$refs.contenido.focus();
            }
            if (!isValidFecha) {
              window.alert("Necesita una fecha válida la nota.");
              return this.$refs.fecha.focus();
            }
            return this.accept();
          }
        },
        data: {
          value: {
            tiene_fecha: LswTimer.utils.formatDatestringFromDate(new Date(), false, false, true),
            tiene_titulo: "",
            tiene_categorias: "",
            tiene_contenido: "",
            tiene_estado: "creada", // "procesada"
          }
        }
      }
    });
    return response;
  };

  LswUtils.openAddArticuloDialog = async function () {
    const response = await Vue.prototype.$lsw.dialogs.open({
      title: "Nuevo artículo",
      template: `
        <div class="">
          <lsw-schema-based-form
            :model="{
              databaseId:'lsw_default_database',
              tableId:'Articulo',
              rowId: -1,
            }"
            :on-submit="validate"
          />
        </div>
      `,
      factory: {
        methods: {
          validate(value) {
            console.log("Validating:", value);
            this.value = value;
            const isValidFecha = LswTimer.parser.parse(this.value.tiene_fecha);
            const isValidContenido = this.value.tiene_contenido.trim() !== "";
            const isValidTitulo = this.value.tiene_titulo.trim() !== "";
            if (!isValidTitulo) {
              window.alert("Necesita un título la nota.");
              return this.$refs.titulo.focus();
            }
            if (!isValidContenido) {
              window.alert("Necesita un contenido la nota.");
              return this.$refs.contenido.focus();
            }
            if (!isValidFecha) {
              window.alert("Necesita una fecha válida la nota.");
              return this.$refs.fecha.focus();
            }
            return this.accept();
          }
        },
        data: {
          value: {
            tiene_fecha: LswTimer.utils.formatDatestringFromDate(new Date(), false, false, true),
            tiene_titulo: "",
            tiene_categorias: "",
            tiene_contenido: "",
            tiene_estado: "creada", // "procesada"
          }
        }
      }
    });
    return response;
  };
  // @code.end: LswUtils

  return LswUtils;

});