// @code.start: LswSourceCodeControl API | @$section: Vue.js (v2) Components » Lsw Formtypes API » LswSourceCodeControl component
Vue.component("LswSourceCodeControl", {
  template: $template,
  props: {
    configurations: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    this.$trace("lsw-source-code.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-source-code.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
// @code.end: LswSourceCodeControl API