// @code.start: LswWiki API | @$section: Vue.js (v2) Components » Lsw Wiki API » LswWiki component
Vue.component("LswWiki", {
  name: "LswWiki",
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-wiki.data");
    return {
      search_text_1: "",
    };
  },
  methods: {
    search() {
      this.$trace("lsw-wiki.methods.search");
      console.log("Search");
    }
  },
  watch: {
    
  },
  async mounted() {
    try {
      this.$trace("lsw-wiki.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswWiki API