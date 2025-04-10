Vue.component("LswPageRows", {
  template: $template,
  props: {
    databaseExplorer: {
      type: Object,
      required: true
    },
    args: {
      type: Object,
      required: true
    },
  },
  data() {
    this.$trace("lsw-page-rows.data", arguments);
    $ensure(this.args).type("object");
    $ensure(this.args.database).type("string");
    $ensure(this.args.table).type("string");
    return {
      breadcrumb: [{
        page: "LswPageTables",
        name: this.args.database,
        args: {
          database: this.args.database
        }
      }, {
        page: "LswPageRows",
        name: this.args.table,
        args: {
          database: this.args.database,
          table: this.args.table
        },
        current: true
      }],
      database: this.args.database,
      table: this.args.table,
      rows: undefined,
      connection: undefined,
    }
  },
  methods: {
    goBack() {
      this.$trace("lsw-page-rows.methods.goBack", arguments);
      return this.databaseExplorer.selectPage("LswPageTables", {
        database: this.database,
      });
    },
    async loadRows() {
      this.$trace("lsw-page-rows.methods.loadRows", arguments);
      this.connection = this.connection ?? new LswDatabaseAdapter(this.database);
      await this.connection.open();
      const selection = await this.connection.select(this.table, it => true);
      this.rows = selection;
      return selection;
    },
    openRow(rowId) {
      this.$trace("lsw-page-rows.methods.openRow", arguments);
      return this.databaseExplorer.selectPage("LswPageRow", {
        database: this.database,
        table: this.table,
        rowId: rowId
      });
    }
  },
  mounted() {
    this.$trace("lsw-page-rows.mounted", arguments);
    this.loadRows();
  },
  unmounted() {
    this.$trace("lsw-page-rows.unmounted", arguments);
    this.connection.close();
  }
});