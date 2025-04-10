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