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
    },
  },
  data() {
    return {
      contents: this.filecontents,
      currentFontsize: 12,
      currentFontfamily: "Arial"
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
    },
    increaseFontsize() {
      this.$trace("lsw-filesystem-editor.methods.increaseFontsize");
      this.currentFontsize++;
    },
    decreaseFontsize() {
      this.$trace("lsw-filesystem-editor.methods.decreaseFontsize");
      this.currentFontsize--;
    },
    toggleFontfamily() {
      this.$trace("lsw-filesystem-editor.methods.toggleFontfamily");
      if(this.currentFontfamily === "monospace") {
        this.currentFontfamily = "Arial";
      } else {
        this.currentFontfamily = "monospace";
      }
    },
    async saveDocument() {
      this.$trace("lsw-filesystem-editor.methods.saveDocument");
      await this.$lsw.fs.write_file(this.explorer.current_node, this.contents);
      this.$lsw.toasts.send({
        title: "Documento guardado",
        text: "El documento se guardó correctamente"
      });
    }
  },
  mounted() {

  }
});
// @code.end: LswFilesystemEditor API