// @code.start: LswWiki API | @$section: Vue.js (v2) Components » Lsw Wiki API » LswWiki component
Vue.component("LswWiki", {
  name: "LswWiki",
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-wiki.data");
    return {
      isSearching: true,
      isShowingNavigation: false,
      isLoadedLibros: true,
      isLoadedCategorias: true,
      selectedSection: 'articulos',
    };
  },
  methods: {
    selectSection(section) {
      this.$trace("lsw-wiki.methods.selectSection");
      this.selectedSection = section;
      this.isShowingNavigation = false;
    },
    toggleNavigation() {
      this.$trace("lsw-wiki.methods.toggleNavigation");
      this.isShowingNavigation = !this.isShowingNavigation;
    },
    hideNavigation() {
      this.$trace("lsw-wiki.methods.hideNavigation");
      this.isShowingNavigation = false;
    },
    openLibrosFolder() {
      this.$trace("lsw-wiki.methods.openLibrosFolder");
      this.$lsw.dialogs.open({
        id: LswRandomizer.getRandomString(10),
        title: "Todos los libros",
        template: `
          <lsw-filesystem-explorer
            :absolute-layout="true"
            opened-by="/kernel/wiki/libros"
          />
        `
      });
    },
    openCategoriasFile() {
      this.$trace("lsw-wiki.methods.openCategoriasFile");
      this.$lsw.dialogs.open({
        id: LswRandomizer.getRandomString(10),
        title: "Todas las categorías",
        template: `
          <lsw-filesystem-explorer
            :absolute-layout="true"
            opened-by="/kernel/wiki/categorias.tri"
          />
        `
      });
    },
    refreshLibros() {
      this.$trace("lsw-wiki.methods.refreshLibros");
      this.isLoadedLibros = false;
      setTimeout(() => {
        this.isLoadedLibros = true;
      }, 100);
    },
    refreshCategorias() {
      this.$trace("lsw-wiki.methods.refreshCategorias");
      this.isLoadedCategorias = false;
      setTimeout(() => {
        this.isLoadedCategorias = true;
      }, 100);
    },
  },
  watch: {
    
  },
  async mounted() {
    try {
      this.$trace("lsw-wiki.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswWiki API