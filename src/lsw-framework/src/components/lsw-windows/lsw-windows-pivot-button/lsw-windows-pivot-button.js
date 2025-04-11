// @code.start: LswWindowsPivotButton API | @$section: Vue.js (v2) Components » Lsw Windows API » LswWindowsPivotButton component
// Change this component at your convenience:
Vue.component("LswWindowsPivotButton", {
  template: $template,
  props: {
    viewer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    onClick(event) {
      this.viewer.toggleState();
    }
  },
  mounted() {
    
  }
});
// @code.end: LswWindowsPivotButton API