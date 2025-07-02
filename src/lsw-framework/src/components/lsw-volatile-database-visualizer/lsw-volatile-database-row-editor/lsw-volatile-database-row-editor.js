// @code.start: LswVolatileDatabaseRowEditor API | @$section: Vue.js (v2) Components » LswVolatileDatabaseRowEditor component
Vue.component("LswVolatileDatabaseRowEditor", {
  template: $template,
  props: {
    table: {
      type: [String, Boolean],
      default: false,
    },
    id: {
      type: [Number, String, Boolean],
      default: false,
    },
    closer: {
      type: [Function, Boolean],
      default: false,
    }
  },
  data() {
    return {
      isLoaded: false,
      row: false,
      rowRepresentation: false,
      volatileDbTableButtons: [{
        text: '⚡️↖️',
        event: () => {
          this.saveAndClose()
        },
      }, {
        text: '🔄',
        event: () => {
          this.load()
        },
      }, {
        text: '⚡️',
        event: () => {
          this.save()
        },
      }],
    };
  },
  methods: {
    getContents() {
      return this.$refs.editor.contents;
    },
    async load() {
      this.isLoaded = false;
      if (this.table && this.id) {
        const row = LswVolatileDatabase.global.selectById(this.table, this.id);
        if (row) {
          this.rowRepresentation = LswVolatileDatabase.fromRowToRepresentation(row, this.table, this.id);
        } else {
          this.rowRepresentation = `@@?=new`;
        }
        this.row = row;
      } else {
        this.row = {};
        this.rowRepresentation = `@@?=new`;
      }
      this.isLoaded = true;
      this.$nextTick(() => {
        this.editorPayload();
      });
    },
    editorPayload() {

    },
    async save() {
      try {
        const contents = this.getContents();
        const rows = LswVolatileDatabase.fromRepresentationToRows(contents);
        // @TODEBUG:
        // console.log(rows);
        LswVolatileDatabase.global.absorveRowsRepresentation(contents);
        Vue.prototype.$lsw.toasts.send({
          title: `Absorvidas ${rows.length} filas`,
          message: "Las filas fueron absorvidas correctamente."
        });
      } catch (error) {
        Vue.prototype.$lsw.toasts.showError(error);
      }
    },
    saveAndClose() {
      this.save();
      if (typeof this.closer === "function") {
        this.closer();
      }
    },
  },
  watch: {},
  async mounted() {
    window.$vdbe = this;
    await this.load();
  }
});
// @code.end: LswVolatileDatabaseRowEditor API