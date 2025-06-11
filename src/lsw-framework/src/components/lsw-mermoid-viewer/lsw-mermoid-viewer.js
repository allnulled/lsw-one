// @code.start: LswMermoidViewer API | @$section: Vue.js (v2) Components » Lsw SchemaBasedForm API » LswMermoidViewer component
Vue.component("LswMermoidViewer", {
  template: $template,
  props: {
    source: {
      type: String,
      required: true,
    }
  },
  data() {
    this.$trace("lsw-mermoid-viewer.data");
    return {
      isLoaded: false,
    };
  },
  methods: {
    composeVisualTree() {
      this.$trace("lsw-mermoid-viewer.methods.composeVisualTree");
      // ...
      console.log("composeVisualTree:", this.source);
    }
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-mermoid-viewer.mounted");
      
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswMermoidViewer API