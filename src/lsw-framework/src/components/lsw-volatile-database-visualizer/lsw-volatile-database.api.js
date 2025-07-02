(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswVolatileDatabase'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswVolatileDatabase'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const LswVolatilePersisterForLS = class {

    constructor(storageId) {
      this.storageId = storageId;
    }

    save(data) {
      localStorage[this.storageId] = JSON.stringify(data);
    }

    read(defaultValue = {}) {
      try {
        const data = JSON.parse(localStorage[this.storageId]);
        return data;
      } catch (error) {
        return defaultValue;
      }
    }

  };

  const LswVolatilePersisterForLsw = class extends LswVolatilePersisterForLS {

    save(data) {
      // @NOT-SUPPORTED
    }

    read(defaultValue = null) {
      Vue.prototype.$lsw.fs.evaluateAsJavascriptFileOrReturn(`/kernel/volatile-database/${this.storageId}/triggers.js`, defaultValue);
    }

  }

  const LswVolatileDatabase = class {

    static defaultFilters = {
      SELECT_ALL: () => true,
    };

    static defaultOptions = {
      propagateErrors: false,
      storageId: "lsw_volatile_default_database",
    };

    static create(...args) {
      return new this(...args);
    }

    constructor(options = {}) {
      this.options = Object.assign({}, this.constructor.defaultOptions, options);
      this.schema = {};
      this.data = {};
      this.storageId = this.options.storageId;
      this.triggers = new TriggersClass();
      this.persister = new LswVolatilePersisterForLS(this.storageId);
    }

    resetDatabase() {
      this.setData({});
      this.setSchema({});
    }

    onLoadTriggers() {
      return Vue.prototype.$lsw.fs.evaluateAsJavascriptFileOrReturn(`/kernel/volatile-database/${this.storageId}/triggers.js`, []);
    }

    onSaveTriggers() {
      // @OK: los triggers se tienen que persistir aparte porque no se pueden deshidratar los punteros y funciones a json ni js
      // @SO: los triggers se escriben a mano a parte en el fs
    }

    loadDatabase() {
      const {
        data,
        schema,
      } = this.persister.read({
        data: {},
        schema: {},
      })
      this.setData(data);
      this.setSchema(schema);
      return this.onLoadTriggers();
    }

    saveDatabase() {
      const persistibleData = this.toPersistible();
      this.persister.save(persistibleData);
      this.onSaveTriggers();
    }

    toPersistible() {
      return {
        schema: this.schema,
        data: this.data,
      };
    }

    setSchema(schema) {
      this.schema = schema;
    }

    getSchema() {
      return this.schema;
    }

    setData(data) {
      this.data = data;
    }

    getData() {
      return this.data;
    }

    ensureTable(table) {
      if (!(table in this.data)) {
        this.data[table] = [];
      }
    }

    consumeNextIdFor(table) {
      if (!(table in this.schema)) {
        this.schema[table] = { id: 0 };
      }
      this.schema[table].id++;
      return "" + this.schema[table].id;
    }

    addRowTo(table, row) {
      this.ensureTable(table);
      const cleanRow = Object.assign({}, row, {
        id: this.consumeNextIdFor(table),
      });
      this.data[table].push(cleanRow);
      return row.id;
    }

    overrideRowWith(table, rowId, props = {}) {
      this.ensureTable(table);
      const tableData = this.data[table];
      Iterating_rows:
      for (let indexRow = 0; indexRow < tableData.length; indexRow++) {
        const row = tableData[indexRow];
        if (row.id === rowId) {
          tableData[indexRow] = Object.assign({}, row, props, { id: row.id });
          return rowId;
        }
      }
      return null;
    }

    removeRow(table, rowId) {
      this.ensureTable(table);
      const tableData = this.data[table];
      for (let indexRow = 0; indexRow < tableData.length; indexRow++) {
        const row = tableData[indexRow];
        if (row.id === rowId) {
          this.data[table].splice(indexRow, 1);
          return rowId;
        }
      }
      return null;
    }

    handleError(error, id = "undefined", propagateError = false) {
      if (this.options.propagateErrors) {
        console.log(`[*] Silenced lsw-volatile-database error «id=${id}»`, error);
      }
      if (propagateError) {
        throw error;
      }
    }

    find(filter = this.constructor.defaultFilters.SELECT_ALL) {
      let output = [];
      const tables = Object.keys(this.data);
      for (let index = 0; index < tables.length; index++) {
        const tableId = tables[index];
        const matches = this.select(tableId, filter);
        output = output.concat(matches.map(row => {
          return {
            $table: tableId,
            ...row,
          };
        }));
      }
      return output;
    }

    select(table, filter = this.constructor.defaultFilters.SELECT_ALL, propagateErrors = this.options.propagateErrors) {
      let result = undefined;
      try {
        this.ensureTable(table);
        LswVolatileDatabase.global.triggers.emit("db.select.before", { table, filter });
        result = this.data[table].filter(filter);
        LswVolatileDatabase.global.triggers.emit("db.select.after", { table, filter, result });
        return result;
      } catch (error) {
        this.handleError(error, "3.124.321", propagateErrors);
        return result;
      }
    }

    selectById(table, id, propagateErrors = this.options.propagateErrors) {
      let result = undefined;
      try {
        this.ensureTable(table);
        LswVolatileDatabase.global.triggers.emit("db.select.before", { table, id });
        result = this.data[table].filter(it => (""+it.id) === ("" + id));
        if (result.length === 0) {
          result = null;
        } else if (result.length === 1) {
          result = result[0];
        } else {
          throw new Error("This error can never happen [01230914]");
        }
        LswVolatileDatabase.global.triggers.emit("db.select.after", { table, id, result });
        return result;
      } catch (error) {
        this.handleError(error, "3.124.321", propagateErrors);
        return result;
      }
    }

    insert(table, item, propagateErrors = this.options.propagateErrors) {
      let id = false;
      try {
        this.ensureTable(table);
        LswVolatileDatabase.global.triggers.emit("db.insert.before", { table, item });
        id = this.addRowTo(table, item);
        LswVolatileDatabase.global.triggers.emit("db.insert.after", { table, item, id });
        return id;
      } catch (error) {
        this.handleError(error, "3.124.322", propagateErrors);
        return id;
      }
    }

    bulk(table, items, propagateErrors = this.options.propagateErrors) {
      try {
        this.ensureTable(table);
        LswVolatileDatabase.global.triggers.emit("db.insert.bulk.before", { table, items });
        const bulkedIds = [];
        for (let indexItem = 0; indexItem < items.length; indexItem++) {
          const item = items[indexItem];
          const id = this.addRowTo(table, item);
          bulkedIds.push(id);
        }
        LswVolatileDatabase.global.triggers.emit("db.insert.bulk.after", { table, items, ids: bulkedIds });
        return bulkedIds;
      } catch (error) {
        this.handleError(error, "3.124.322", propagateErrors);
        return bulkedIds;
      }
    }

    upsert(table, id, item) {
      try {
        const row = this.selectById(table, id);
        if (row === null) {
          return this.insert(table, item);
        } else {
          return this.update(table, id, item);
        }
      } catch (error) {
        console.handleError(error, "3.124.328", propagateErrors);
      }
    }

    update(table, filter, properties, propagateErrors = this.options.propagateErrors) {
      try {
        this.ensureTable(table);
        LswVolatileDatabase.global.triggers.emit("db.update.before", { table, filter, properties });
        const updatedIds = [];
        const tableData = this.data[table];
        for (let indexRow = 0; indexRow < tableData.length; indexRow++) {
          const row = tableData[indexRow];
          let isAccepted = false;
          try {
            if (typeof filter === "function") {
              isAccepted = filter(row);
            } else if (typeof filter === "string") {
              isAccepted = row.id === filter;
            } else {
              throw new Error("Required argument «filter» to be string or function on «LswVolatileDatabase.update»");
            }
          } catch (error) {
            // @BADLUCK
          }
          if (isAccepted) {
            const newRow = Object.assign({}, row, properties, { id: row.id });
            tableData.splice(indexRow, 1, newRow);
            updatedIds.push(row.id);
          }
        }
        LswVolatileDatabase.global.triggers.emit("db.update.after", { table, filter, properties, ids: updatedIds });
        return updatedIds;
      } catch (error) {
        this.handleError(error, "3.124.323", propagateErrors);
        return updatedIds;
      }
    }

    delete(table, filter, propagateErrors = this.options.propagateErrors) {
      try {
        this.ensureTable(table);
        LswVolatileDatabase.global.triggers.emit("db.delete.before", { table, filter });
        const deletedIds = [];
        const tableData = this.data[table];
        for (let indexRow = 0; indexRow < tableData.length; indexRow++) {
          const row = tableData[indexRow];
          let isAccepted = false;
          try {
            if (typeof filter === "function") {
              isAccepted = filter(row);
            } else if (typeof filter === "string") {
              isAccepted = row.id === filter;
            } else {
              throw new Error("Required argument «filter» to be string or function on «LswVolatileDatabase.update»");
            }
          } catch (error) {
            // @BADLUCK
          }
          if (isAccepted) {
            tableData.splice(indexRow, 1);
            deletedIds.push(row.id);
          }
        }
        LswVolatileDatabase.global.triggers.emit("db.delete.after", { table, filter, ids: deletedIds });
        return deletedIds;
      } catch (error) {
        this.handleError(error, "3.124.324", propagateErrors);
        return deletedIds;
      }
    }

    visualize(dataInput = false, ...args) {
      const data = dataInput === false ? this.find() : dataInput;
      return this.constructor.visualize(data, ...args);
    }

    static visualize(data = [], title = "Visualización de datos volátiles") {
      Vue.prototype.$lsw.dialogs.open({
        title: title,
        template: `
          <div class="pad_1 pad_bottom_0">
            <lsw-volatile-database-visualizer :initial-data="rows" />
          </div>
        `,
        factory: {
          data: {
            rows: data,
          }
        }
      });
    }

    editTriggers() {
      Vue.prototype.$lsw.dialogs.open({
        title: `Edición de triggers volátiles [${this.storageId}]`,
        template: `
          <div class="pad_1 pad_bottom_0">
            <lsw-filesystem-explorer :opened-by="'/kernel/volatile-database/' + storageId + '/triggers.js'" />
          </div>
        `,
        factory: {
          data: {
            storageId: this.storageId,
          }
        }
      });
    }

    editRow(table, id) {
      Vue.prototype.$lsw.dialogs.open({
        title: `Edición de row «${table}#${id}» [${this.storageId}]`,
        template: `
          <div class="pad_horizontal_1">
            <lsw-volatile-database-row-editor :table="table" :id="id" />
          </div>
        `,
        factory: {
          data: {
            table,
            id,
          }
        }
      });
    }

    static sanitizeRepresentation(text) {
      return (""+text).replace(/(^|\n)(@)/g, "$1 @");
    }

    static fromRowToRepresentation(row, table = false, id = false) {
      console.log(row, table, id);
      let dataRepr = "";
      const sortedProps = Object.keys(row).sort();
      if (table) {
        dataRepr += `@@${table}=${id || ""}`;
      }
      Iterating_props:
      for (let indexProp = 0; indexProp < sortedProps.length; indexProp++) {
        const propId = sortedProps[indexProp];
        if(propId === "$table") {
          continue Iterating_props;
        }
        const val = row[propId];
        const propSan = this.sanitizeRepresentation(propId);
        const valSan = this.sanitizeRepresentation(val);
        dataRepr += `\n@${propSan}=${valSan}`;
      }
      return dataRepr.trim();
    }

    fromRowsToRepresentation() {
      const allData = this.find();
      return this.constructor.fromRowsToRepresentation(allData);
    }

    static fromRowsToRepresentation(rows) {
      let repr = "";
      for(let index=0; index<rows.length; index++) {
        const row = rows[index];
        const rowRepr = this.fromRowToRepresentation(row, row.$table || "?", row.id || "?");
        repr += rowRepr + "\n";
      }
      return repr;
    }

    static fromRepresentationToRows(representation) {
      return VolatileRowParser.parse(representation);
    }

    absorveRowsRepresentation(representation) {
      const rowsMap = VolatileRowParser.parse(representation);
      console.log("absorving data:", rowsMap);
      return this.absorveRowsMap(rowsMap);
    }

    absorveRowsMap(rowsMap) {
      try {
        if (!Array.isArray(rowsMap)) {
          throw new Error(`Required parameter «rowsMap» to be an array on «VolatileDatabase.absorveRowsMap»`);
        }
        if (rowsMap.length === 0) {
          throw new Error(`Required parameter «rowsMap» to have at least 1 item on «VolatileDatabase.absorveRowsMap»`);
        }
        const output = [];
        Iterating_rows:
        for (let indexRow = 0; indexRow < rowsMap.length; indexRow++) {
          const rowData = rowsMap[indexRow];
          const { into: schema, row } = rowData;
          const { table, id } = schema;
          if(["?"].indexOf(table) !== -1) {
            continue Iterating_rows;
          }
          console.log(row);
          if(["new","+"].indexOf(id) !== -1) {
            console.log("INSERTANDO VIA INSERT:", row);
            
            const resultRow = this.insert(table, row);
            output.push(resultRow);
            continue Iterating_rows;
          }
          console.log("INSERTANDO VIA UPSERT:", row);
          const resultRow = this.upsert(table, id, row);
          output.push(resultRow);
        }
        return output;
      } catch (error) {
        throw error;
      }
    }

  };

  LswVolatileDatabase.global = new LswVolatileDatabase();

  window.VolatileDB = LswVolatileDatabase.global;

  return LswVolatileDatabase;

});