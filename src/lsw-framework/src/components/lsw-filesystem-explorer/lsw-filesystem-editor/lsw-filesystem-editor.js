// @code.start: LswFilesystemEditor API | @$section: Vue.js (v2) Components » Lsw Filesystem Explorer API » LswFilesystemEditor component
Vue.component("LswFilesystemEditor", {
  name: "LswFilesystemEditor",
  template: $template,
  props: {
    explorer: {
      type: Object,
      required: true
    },
    filecontents: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      contents: this.filecontents
    };
  },
  watch: {

  },
  methods: {
    getContents() {
      return this.contents;
    },
    setContents(contents) {
      this.contents = contents;
    }
  },
  mounted() {

  }
});
// @code.end: LswFilesystemEditor API