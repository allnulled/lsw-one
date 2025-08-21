// @code.start: LswNuevaFeature API | @$section: Vue.js (v2) Components » LswNuevaFeature component
Vue.component("LswNuevaFeature", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-nueva-feature.data");
    
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
  computed: {
    
  },
  watch: {
    error(error) {
      if(error.expected) {
        error.expected = LswUtils.uniquizeArray(error.expected.map(sugg => sugg.description));
      }
    }
  },
  async mounted() {
    try {
      this.$trace("lsw-nueva-feature.mounted");
      this.load();
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswNuevaFeature API