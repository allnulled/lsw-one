(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswMicrodataBank'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswMicrodataBank'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const LswMicrodataBank = class {

    static create(...args) {
      return new this(...args);
    }

    static ACCEPT_ALL_FILTER() {
      return true;
    }

    static DEFAULT_OPTIONS() {
      return {
        trace: (Vue?.prototype?.$lsw?.logger?.$options?.active ),
      };
    }

    constructor(store = "Banco_de_datos_principal") {
      this.$store = store;
      this.$options = Object.assign(this.constructor.DEFAULT_OPTIONS);
    }

    trace(method, part = false) {
      if (!!this.$options.trace) {
        return;
      }
      let message = `[trace][lsw-microdata-bank] ${method}`;
      if (part) {
        message += ` ${part}`;
      }
    }

    async select(subtype, filter = this.constructor.ACCEPT_ALL_FILTER) {
      this.trace("select");
      try {
        if (typeof filter !== "function") {
          throw new Error("Required parameter 2 to be a function on «LswMicrodataBank.select»");
        }
        const allRows = await Vue.prototype.$lsw.database.select(this.$store, this.constructor.ACCEPT_ALL_FILTER);
        const matchedRows = allRows.filter((it) => {
          try {
            const matchesDatatype = it.datatype === subtype;
            if (!matchesDatatype) {
              return false;
            }
            return filter(it);
          } catch (error) {
            console.log("Error on «LswMicrodataBank.select» while applying filter:", error);
            return false;
          }
        });
        return matchedRows;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    selectMany(subtype, filter) {
      this.trace("selectMany");
      return this.select(subtype, filter);
    }

    async selectFirst(subtype, filter) {
      this.trace("selectFirst");
      const data = await this.select(subtype, filter);
      if (data.length === 0) {
        throw new Error("Required parameter «id» to exist on «LswMicrodataBank.selectFirst»");
      }
      return data[0];
    }

    insert(subtype, itemOrList) {
      this.trace("insert");
      if (Array.isArray(itemOrList)) {
        return this.insertMany(subtype, itemOrList);
      } else if (typeof itemOrList === 'object') {
        return this.insertOne(subtype, itemOrList);
      } else {
        throw new Error("Required parameter 2 to be array or object on «LswMicrodataBank.insert»");
      }
    }

    insertOne(subtype, item) {
      this.trace("insertOne");
      let typedItem = undefined;
      typedItem = Object.assign({}, item, {
        datatype: subtype,
      });
      return Vue.prototype.$lsw.database.insert(this.$store, typedItem);
    }

    insertMany(subtype, list) {
      this.trace("insertMany");
      const insertables = [];
      for (let index = 0; index < list.length; index++) {
        const item = list[index];
        const typedItem = Object.assign({}, item, {
          datatype: subtype,
        });
        insertables.push(typedItem);
      }
      return Vue.prototype.$lsw.database.insertMany(this.$store, insertables);
    }

    update(subtype, idOrFilter, value) {
      this.trace("update");
      if (typeof idOrFilter === 'function') {
        return this.updateMany(subtype, idOrFilter, value);
      } else if (["string", "number"].indexOf(typeof idOrFilter) !== -1) {
        return this.updateOne(subtype, idOrFilter, value);
      } else {
        throw new Error("Required parameter 2 to be function, string or number on «LswMicrodataBank.update»");
      }
    }

    async updateOne(subtype, id, value) {
      this.trace("updateOne");
      const item = await this.selectFirst(subtype, it => {
        const matchesType = it.datatype === subtype;
        const matchesId = it.id === id;
        return matchesType && matchesId;
      });
      return await Vue.prototype.$lsw.database.update(this.$store, item.id, value);
    }

    updateMany(subtype, filter, value) {
      this.trace("updateMany");
      return Vue.prototype.$lsw.database.updateMany(this.$store, it => {
        try {
          const matchesType = it.datatype === subtype;
          if (!matchesType) return false;
          const matchesFilter = filter(it);
          return matchesFilter;
        } catch (error) {
          // @BADLUCK.
          return false;
        }
      }, value);
    }

    delete(subtype, idOrFilter) {
      this.trace("delete");
      if (typeof idOrFilter === 'function') {
        return this.deleteMany(subtype, idOrFilter);
      } else if (["string", "number"].indexOf(typeof idOrFilter) !== -1) {
        return this.deleteOne(subtype, idOrFilter);
      } else {
        throw new Error("Required parameter 2 to be function, string or number on «LswMicrodataBank.delete»");
      }
    }

    deleteOne(subtype, id) {
      this.trace("deleteOne");
      return Vue.prototype.$lsw.database.deleteMany(this.$store, it => {
        const matchesType = it.datatype === subtype;
        const matchesId = it.id === id;
        return matchesType && matchesId;
      });
    }

    deleteMany(subtype, filter) {
      this.trace("deleteMany");
      return Vue.prototype.$lsw.database.deleteMany(this.$store, it => {
        const matchesType = it.datatype === subtype;
        const matchesFilter = filter(it);
        return matchesType && matchesFilter;
      });
    }

    upsert(subtype, idOrFilter, value) {
      this.trace("upsert");
      if (typeof idOrFilter === 'function') {
        return this.upsertMany(subtype, idOrFilter, value);
      } else if (["string", "number"].indexOf(typeof idOrFilter) !== -1) {
        return this.upsertOne(subtype, idOrFilter, value);
      } else {
        throw new Error("Required parameter 2 to be function, string or number on «LswMicrodataBank.upsert»");
      }
    }

    async upsertOne(subtype, id, value) {
      this.trace("upsertOne");
      // @TODO:
      const originalItem = await this.selectFirst(subtype, it => {
        const matchesId = it.id === id;
        return matchesId;
      });
      const newItem = Object.assign({}, originalItem);
      return await Vue.prototype.$lsw.database.update(this.$store, originalItem.id, newItem);
    }

    upsertMany(subtype, filter, value) {
      this.trace("upsertMany");
      // @TODO:
    }

    overwrite(subtype, idOrFilter, value) {
      this.trace("overwrite");
      if (typeof idOrFilter === 'function') {
        return this.overwriteMany(subtype, idOrFilter, value);
      } else if (["string", "number"].indexOf(typeof idOrFilter) !== -1) {
        return this.overwriteOne(subtype, idOrFilter, value);
      } else {
        throw new Error("Required parameter 2 to be function, string or number on «LswMicrodataBank.overwrite»");
      }
    }

    overwriteOne(subtype, filter, value) {
      this.trace("overwriteOne");
      // @TODO:
    }

    overwriteMany(subtype, filter, value) {
      this.trace("overwriteMany");
      // @TODO:
    }

  };

  return LswMicrodataBank;

});