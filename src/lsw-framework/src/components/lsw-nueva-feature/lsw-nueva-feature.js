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



      const output = await LswTester.create().define({
        id: "lsw.test.api.intro",
        fromCallback: function() {
          console.log("lsw.test.api.into");
        }
      }).run();

      console.log(output);



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