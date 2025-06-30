// @code.start: LswVolatileDatabaseRowEditor API | @$section: Vue.js (v2) Components » LswVolatileDatabaseRowEditor component
Vue.component("LswVolatileDatabaseRowEditor", {
  template: $template,
  props: {
    table: {
      type: String,
      required: true,
    },
    id: {
      type: [Integer,String],
      required: true,
    },
  },
  data() {
    return {
      row: LswVolatile.global.selectById(this.table, this.id);
    };
  },
  methods: {
    load() {

    }
  },
  watch: {},
  mounted() {
    
  }
});
// @code.end: LswVolatileDatabaseRowEditor API