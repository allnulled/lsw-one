// @code.start: LswErrorViewer API | @$section: Vue.js (v2) Components » Lsw Formtypes API » LswErrorViewer component
Vue.component("LswErrorViewer", {
  template: $template,
  props: {
    error: {
      type: [Object, Boolean],
      default: () => false
    },
    onClearError: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    this.$trace("lsw-error-viewer.data");
    return {
      currentError: this.error,
    };
  },
  methods: {
    setError(error = undefined) {
      this.$trace("lsw-error-viewer.methods.setError");
      this.currentError = error;
      if(typeof error === "undefined") {
        this.onClearError();
      }
    },
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-error-viewer.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswErrorViewer API