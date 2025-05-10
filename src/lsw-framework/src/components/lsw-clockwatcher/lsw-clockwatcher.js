// @code.start: LswWindowsMainTab API | @$section: Vue.js (v2) Components » Lsw Windows API » LswWindowsMainTab component
// Change this component at your convenience:
Vue.component("LswClockwatcher", {
  template: $template,
  props: {
    viewer: {
      type: Object,
      required: true
    }
  },
  data() {
    this.$trace("lsw-clockwatcher.data");
    return {
      currentDate: new Date(),
    };
  },
  methods: {
    onClick(event) {
      this.$trace("lsw-clockwatcher.methods.onClick");
      this.viewer.toggleState();
    },
    startTimer() {
      this.$trace("lsw-clockwatcher.methods.startTimer");
      this.timerId = setTimeout(() => {
        this.currentDate = new Date();
        this.startTimer();
      }, 1000 * 60);
    },
    stopTimer() {
      this.$trace("lsw-clockwatcher.methods.stopTimer");
      clearTimeout(this.timerId);
    },
  },
  mounted() {
    this.$trace("lsw-clockwatcher.mounter");
    this.startTimer();
  },
  unmount() {
    this.$trace("lsw-clockwatcher.mounter");
    this.stopTimer();
  }
});
// @code.end: LswWindowsMainTab API