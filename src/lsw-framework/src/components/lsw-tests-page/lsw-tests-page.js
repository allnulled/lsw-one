// @code.start: LswTestsPage API | @$section: Vue.js (v2) Components » Lsw Unit Test Page » LswTestsPage component
Vue.component("LswTestsPage", {
  template: $template,
  props: {

  },
  data() {
    return {
      selectedSection: "coverage",
      initializationError: false,
      choosenTester: false,
    };
  },
  methods: {
    selectSection(subsection) {
      this.$trace("lsw-tests-page.methods.selectSection");
      this.selectedSection = subsection;
    },
    async initializeTester() {
      this.$trace("lsw-tests-page.methods.initializeTester");
      try {
        this.choosenTester = LswTester.create().define({
          id: "lsw.test.main",
          fromCollection: [{
            id: "lsw.test.main.intro",
            fromCallback: async function (context) {
              const { assert } = context;
              assert.as("some assertion").that(true);
              await LswDom.waitForMilliseconds(500);
              assert.as("some assertion").that(true);
              await LswDom.waitForMilliseconds(500);
              assert.as("some assertion").that(true);
              await LswDom.waitForMilliseconds(500);
              assert.as("some assertion").that(true);
              throw new Error("algo pasó aquí")
              await LswDom.waitForMilliseconds(500);
              assert.as("some assertion").that(true);
              await LswDom.waitForMilliseconds(500);
              console.log("lsw.test.main.intro");
            },
          }, {
            id: "lsw.test.main.body",
            fromCollection: [{
              id: "lsw.test.main.body.check-globals",
              fromCallback: async function (context) {
                const { assert } = context;
                assert.as("some assertion").that(true);
                await LswDom.waitForMilliseconds(500);
                assert.as("some assertion").that(true);
                await LswDom.waitForMilliseconds(500);
                assert.as("some assertion").that(true);
                await LswDom.waitForMilliseconds(500);
                assert.as("some assertion").that(true);
                await LswDom.waitForMilliseconds(500);
                assert.as("some assertion").that(true);
                await LswDom.waitForMilliseconds(500);
                console.log("lsw.test.main.body.check-globals");
              }
            }, {
              id: "lsw.test.main.body.check-vue",
              fromCallback: async function (context) {
                const { assert } = context;
                assert.as("some assertion").that(true);
                await LswDom.waitForMilliseconds(500);
                assert.as("some assertion").that(true);
                await LswDom.waitForMilliseconds(500);
                assert.as("some assertion").that(true);
                await LswDom.waitForMilliseconds(500);
                assert.as("some assertion").that(true);
                await LswDom.waitForMilliseconds(500);
                assert.as("some assertion").that(true);
                await LswDom.waitForMilliseconds(500);
                console.log("lsw.test.main.body.check-vue");
              }
            }],
          }, {
            id: "lsw.test.main.end",
            fromCallback: async function (context) {
              const { assert } = context;
              assert.as("some assertion").that(true);
              await LswDom.waitForMilliseconds(500);
              assert.as("some assertion").that(true);
              await LswDom.waitForMilliseconds(500);
              assert.as("some assertion").that(true);
              await LswDom.waitForMilliseconds(500);
              assert.as("some assertion").that(true);
              await LswDom.waitForMilliseconds(500);
              assert.as("some assertion").that(true);
              await LswDom.waitForMilliseconds(500);
              console.log("lsw.test.main.end");
            },
          }]
        }).options({
          onAnything(event) {
            console.log("eventuated:", event);
          }
        });
      } catch (error) {
        this.initializationError = error;
        this.$lsw.toasts.showError(error);
        console.log(error);
        throw error;
      }
    }
  },
  watch: {},
  async mounted() {
    this.$trace("lsw-tests-page.mounted");
    await this.initializeTester();
  }
});
// @code.end: LswTestsPage API