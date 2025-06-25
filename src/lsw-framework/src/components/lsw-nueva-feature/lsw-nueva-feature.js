// @code.start: LswNuevaFeature API | @$section: Vue.js (v2) Components » LswNuevaFeature component
Vue.component("LswNuevaFeature", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-nueva-feature.data");
    
    return {
      
    };
  },
  methods: {
    async load() {
      
    }
  },
  watch: {},
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