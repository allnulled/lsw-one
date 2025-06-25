// @code.start: LswSqliteConsole API | @$section: Vue.js (v2) Components » LswSqliteConsole component
const defaultScript = `

SELECT * FROM sqlite_master;

`;
Vue.component("LswSqliteConsole", {
  template: $template,
  props: {
    
  },
  data() {
    this.$trace("lsw-sqlite-console.data");
    return {
      selectedSection: "js", // "js", "sql", "data"
      code: defaultScript.trim(),
      output: "",
      executionError: false,
      isSqliteLoaded: false,
    };
  },
  methods: {
    async loadEnvironment() {
      LswLazyLoads.loadSqlite().then(() => {
        this.isSqliteLoaded = true;
      });
    },
    async executeCode() {
      this.$trace("lsw-sqlite-console.methods.executeCode");
      try {
        this.output = await LswSqlite.execute(this.code);
      } catch (error) {
        this.output = "Error";
        this.executionError = error;
        console.error(error);
      }
    },
    async developmentPayload() {
      //const schema = await LswSqlite.getSchemaFromDatabase();
      //this.$lsw.debugger.debug(schema);
    }
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-sqlite-console.mounted");
      await this.loadEnvironment();
      await this.developmentPayload();
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswSqliteConsole API