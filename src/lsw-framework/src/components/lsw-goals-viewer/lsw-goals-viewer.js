// @code.start: LswGoalsViewer API | @$section: Vue.js (v2) Components » LswGoalsViewer component
Vue.component("LswGoalsViewer", {
  template: $template,
  props: {
    onClose: {
      type: [Function, Boolean],
      default: false,
    }
  },
  data() {
    this.$trace("lsw-goals-viewer.data");
    return {
      isGoalsLoaded: false,
      goalsData: false
    };
  },
  methods: {
    async loadGoals() {
      this.$trace("lsw-goals-viewer.methods.loadGoals");
      this.goalsData = await LswGoals.loadGoals();
      this.isGoalsLoaded = true;
    },
    emitClose() {
      this.$trace("lsw-goals-viewer.methods.emitClose");
      if(typeof this.onClose === "function") {
        this.onClose(this);
      }
    },
    openGoalsDirectory() {
      this.$trace("lsw-goals-viewer.methods.openGoalsDirectory");
      this.$lsw.dialogs.open({
        title: "Directorio de objetivos",
        template: `
          <lsw-filesystem-explorer :absolute-layout="true" opened-by="/kernel/settings/goals" />
        `
      });
    },
    expandGoal(goal) {
      return Object.assign({}, goal, {
          "tiene el": goal.porcentaje,
          "falta el": 100-goal.porcentaje
      });
    },
    sortGoals(g1, g2) {
      const u1 = g1.urgencia || 0;
      const u2 = g2.urgencia || 0;
      const c1 = g1["tiene el"] || 0;
      const c2 = g2["tiene el"] || 0;
      const g1over = c1 > 100;
      const g2over = c2 > 100;
      if(g2over) return -1;
      if(g1over) return 1;
      if(u1 > u2) return -1;
      if(u1 < u2) return 1;
      if(c1 < c2) return -1;
      if(c1 > c2) return 1;
      return 0;
    },
  },
  watch: {},
  mounted() {
    this.$trace("lsw-goals-viewer.mounted");
    this.loadGoals();
  },
  unmounted() {
    this.$trace("lsw-goals-viewer.unmounted");
  }
});
// @code.end: LswGoalsViewer API