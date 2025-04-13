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
    this.$trace("lsw-windows-pivot-button.data");
    return {
      currentDate: new Date(),
    };
  },
  methods: {
    startTimer() {
      this.$trace("lsw-windows-pivot-button.methods.startTimer");
      this.timerId = setTimeout(() => {
        this.currentDate = new Date();
        this.startTimer();
      }, 1000);
    },
    stopTimer() {
      this.$trace("lsw-windows-pivot-button.methods.stopTimer");
      clearTimeout(this.timerId);
    },
    onClick(event) {
      this.$trace("lsw-windows-pivot-button.methods.onClick");
      this.viewer.toggleState();
    }
  },
  mounted() {
    this.$trace("lsw-windows-pivot-button.mounter");
    this.startTimer();
  },
  unmount() {
    this.$trace("lsw-windows-pivot-button.mounter");
    this.stopTimer();
  }
});
// @code.end: LswWindowsPivotButton API