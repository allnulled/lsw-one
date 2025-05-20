// @code.start: LswGoalsViewer API | @$section: Vue.js (v2) Components » LswGoalsViewer component
Vue.component("LswGoalsViewer", {
  template: $template,
  props: {
    onClose: {
      type: [Function, Boolean],
      default: false,
    },
    onRefresh: {
      type: [Function, Boolean],
      default: false,
    }
  },
  data() {
    this.$trace("lsw-goals-viewer.data");
    return {
      isLoaded: false,
      report: [],
      summary: false,
    };
  },
  methods: {
    async loadGoals() {
      this.$trace("lsw-goals-viewer.methods.loadGoals");
      this.isLoaded = false;
      this.report = await LswGoals.getGoalsReport();
      let resolved = 0;
      let failed = 0;

      for(let index=0; index<this.report.goals.length; index++) {
        const goal = this.report.goals[index];
        console.log(goal);
        if(goal.solved) {
          resolved++;
        } else {
          failed++;
        }
      }
      this.summary = {
        total: this.report.goals.length,
        resolved,
        failed,
      };
      this.isLoaded = true;
    },
    openGoalsFile() {
      this.$trace("lsw-goals-viewer.methods.openGoalsFile");
      this.$dialogs.open({
        title: "Editar objetivos",
        template: `
          <div>
            <lsw-filesystem-explorer opened-by="/kernel/settings/goals.env" />
          </div>
        `
      });
    },
    saveMoment() {
      this.$trace("lsw-goals-viewer.methods.saveMoment");
      this.$lsw.toasts.send({
        title: "Momento guardado!",
        text: "La estadística del día fue almacenada en memoria"
      });
    }
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