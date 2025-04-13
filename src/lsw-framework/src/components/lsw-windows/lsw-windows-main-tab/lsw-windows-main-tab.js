// @code.start: LswWindowsMainTab API | @$section: Vue.js (v2) Components » Lsw Windows API » LswWindowsMainTab component
// Change this component at your convenience:
Vue.component("LswWindowsMainTab", {
  template: $template,
  props: {
    viewer: {
      type: Object,
      required: true
    }
  },
  data() {
    this.$trace("lsw-windows-main-tab.data", arguments);
    return {
      
    };
  },
  methods: {
    getRandomString(len = 10) {
      this.$trace("lsw-windows-main-tab.methods.getRandomString", arguments);
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      let out = "";
      while(out.length < len) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
      }
      return out;
    },
    openRest() {
      this.$trace("lsw-windows-main-tab.methods.openRest", arguments);
      this.viewer.hide();
      this.$dialogs.open({
        id: "database-explorer-" + this.getRandomString(5),
        title: "Database explorer",
        template: `<lsw-database-explorer />`,
      });
    },
    openFilesystem() {
      this.$trace("lsw-windows-main-tab.methods.openFilesystem", arguments);
      this.viewer.hide();
      this.$dialogs.open({
        id: "filesystem-explorer-" + this.getRandomString(5),
        title: "Filesystem explorer",
        template: `<lsw-filesystem-explorer />`,
      });
    },
    openWiki() {
      this.$trace("lsw-windows-main-tab.methods.openWiki", arguments);
      this.viewer.hide();
      this.$dialogs.open({
        id: "wiki-explorer-" + this.getRandomString(5),
        title: "Wiki explorer",
        template: `<div class="pad_2"><lsw-wiki /></div>`,
      });
    },
    openAgenda() {
      this.$trace("lsw-windows-main-tab.methods.openAgenda", arguments);
      this.viewer.hide();
      this.$dialogs.open({
        id: "agenda-viewer-" + this.getRandomString(5),
        title: "Agenda viewer",
        template: `<div class="pad_2"><lsw-agenda /></div>`,
      });
    },
    openAutomessages() {
      this.$trace("lsw-windows-main-tab.methods.openAutomessages", arguments);
      this.viewer.hide();
    },
    openNoteUploader() {
      this.$trace("lsw-windows-main-tab.methods.openNoteUploader", arguments);
      this.viewer.hide();
      this.$dialogs.open({
        id: "note-uploader-" + this.getRandomString(5),
        title: "Note uploader",
        template: `<div class="pad_2"><lsw-notes /></div>`,
      });
    }
  },
  mounted() {
    
  }
});
// @code.end: LswWindowsMainTab API