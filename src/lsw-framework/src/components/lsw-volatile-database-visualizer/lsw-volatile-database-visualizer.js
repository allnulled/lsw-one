// @code.start: LswVolatileDatabaseVisualizer API | @$section: Vue.js (v2) Components » LswVolatileDatabaseVisualizer component
Vue.component("LswVolatileDatabaseVisualizer", {
  template: $template,
  props: {
    initialData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      extraButtons: [{
        text: "↗️",
        event: () => {
          this.$lsw.dialogs.open({
            title: "Editar dato volátil",
            template: `
              <div class="pad_horizontal_1">
                <lsw-volatile-database-row-editor />
              </div>
            `
          })
        }
      }]
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
// @code.end: LswVolatileDatabaseVisualizer API