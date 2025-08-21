// @code.start: LswNatyScriptEditor API | @$section: Vue.js (v2) Components » Lsw Wiki API » LswNatyScriptEditor component
Vue.component("LswNatyScriptEditor", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-naty-script-editor.data");
    return {
      input: `Dios > dice { ok }`,
      output: false,
      error: false,
      errorSummary: false,
    };
  },
  methods: {
    async runTest() {
      try {
        this.output = NatyScriptParser.parse(this.input);
        this.clearError();
      } catch (error) {
        console.error(error);
        this.error = error;
      }
    },
    clearError() {
      this.error = false;
    },
    async load() {

    }
  },
  watch: {
    error(error) {
      if(error.expected) {
        error.expected = LswUtils.uniquizeArray(error.expected.map(sugg => sugg.description));
      }
    }
  },
  mounted() {
    this.$trace("lsw-naty-script-editor.mounted");
    this.load();
  },
  unmount() {
    this.$trace("lsw-naty-script-editor.unmount");
  }
});
// @code.end: LswNatyScriptEditor API