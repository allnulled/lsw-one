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
      printErrors: false,
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
        this.schema[table] = {};
        this.schema[table].id = 0;
      }
      return "" + (++this.schema[table].id);
    }

    addRowTo(table, row) {
      this.ensureTable(table);
      Object.assign(row, {
        id: this.consumeNextIdFor(table),
      });
      this.data[table].push(row);
      return row.id;
    }

    overrideRowWith(table, rowId, props = {}) {
      this.ensureTable(table);
      const tableData = this.data[table];
      Iterating_rows:
      for (let indexRow = 0; indexRow < tableData.length; indexRow++) {
        const row = tableData[indexRow];
        if (row.id === rowId) {
          tableData[indexRow] = Object.assign({}, row, props);
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

    handleError(error, id = "undefined", silenced = false) {
      if (this.options.printErrors) {
        console.log(`[*] Silenced lsw-volatile-database error «id=${id}»`, error);
      }
      if (!silenced) {
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

    select(table, filter = this.constructor.defaultFilters.SELECT_ALL, showErrors = this.options.printErrors) {
      let result = undefined;
      try {
        this.ensureTable(table);
        LswVolatileDatabase.global.triggers.emit("db.select.before", { table, filter });
        result = this.data[table].filter(filter);
        LswVolatileDatabase.global.triggers.emit("db.select.after", { table, filter, result });
        return result;
      } catch (error) {
        this.handleError(error, "3.124.321", showErrors);
        return result;
      }
    }

    selectById(table, id, showErrors = this.options.printErrors) {
      let result = undefined;
      try {
        this.ensureTable(table);
        LswVolatileDatabase.global.triggers.emit("db.select.before", { table, id });
        result = this.data[table].filter(it => it.id === (""+id));
        if(result.length === 0) {
          result = null;
        } else if(result === 1) {
          result = result[0];
        } else {
          throw new Error("This error can never happen [01230914]");
        }
        LswVolatileDatabase.global.triggers.emit("db.select.after", { table, id, result });
        return result;
      } catch (error) {
        this.handleError(error, "3.124.321", showErrors);
        return result;
      }
    }

    insert(table, item, showErrors = this.options.printErrors) {
      let id = false;
      try {
        this.ensureTable(table);
        LswVolatileDatabase.global.triggers.emit("db.insert.before", { table, item });
        id = this.addRowTo(table, item);
        LswVolatileDatabase.global.triggers.emit("db.insert.after", { table, item, id });
        return id;
      } catch (error) {
        this.handleError(error, "3.124.322", showErrors);
        return id;
      }
    }

    bulk(table, items, showErrors = this.options.printErrors) {
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
        this.handleError(error, "3.124.322", true);
        return bulkedIds;
      }
    }

    update(table, filter, properties, showErrors = this.options.printErrors) {
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
            const newRow = Object.assign({}, row, properties);
            tableData.splice(indexRow, 1, newRow);
            updatedIds.push(row.id);
          }
        }
        LswVolatileDatabase.global.triggers.emit("db.update.after", { table, filter, properties, ids: updatedIds });
        return updatedIds;
      } catch (error) {
        this.handleError(error, "3.124.323", true);
        return updatedIds;
      }
    }

    delete(table, filter, showErrors = this.options.printErrors) {
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
        this.handleError(error, "3.124.324", true);
        return deletedIds;
      }
    }

    visualize(dataInput = false, ...args) {
      const data = dataInput === false ? this.find() : dataInput;
      return this.constructor.visualize(data, ...args);
    }

    static visualize(data = [], title = "Visualización de datos por vDB") {
      Vue.prototype.$lsw.dialogs.open({
        title: title,
        template: `
          <div class="pad_horizontal_1">
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
        title: `Edición de triggers por vDB [${this.storageId}]`,
        template: `
          <div class="pad_horizontal_1">
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

  };

  LswVolatileDatabase.global = new LswVolatileDatabase();

  window.VolatileDB = LswVolatileDatabase.global;

  return LswVolatileDatabase;

});