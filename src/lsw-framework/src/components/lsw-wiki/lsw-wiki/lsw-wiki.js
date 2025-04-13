// @code.start: LswWiki API | @$section: Vue.js (v2) Components » Lsw Wiki API » LswWiki component
Vue.component("LswWiki", {
  name: "LswWiki",
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-wiki.data");
    return {
      isSearching: true,
      searchText: "",
      articulos: undefined,
      timeoutId: undefined,
      timeoutSeconds: 0.4,
      openedArticulos: [],
    };
  },
  methods: {
    async loadArticulos() {
      this.$trace("lsw-wiki.methods.loadArticulos");
      clearTimeout(this.searchTimeoutId);
      this.isSearching = true;
      const articulos = await (() => {
        if(this.searchText) {
          return this.$lsw.database.selectMany("Articulo", articulo => {
            return JSON.stringify(articulo).indexOf(this.searchText) !== -1;
          });
        } else {
          return this.$lsw.database.selectMany("Articulo");
        }
      })();
      this.openedArticulos = [];
      this.articulos = articulos;
      this.isSearching = false;
    },
    loadArticulosDelayed() {
      this.$trace("lsw-wiki.methods.loadArticulosDelayed");
      clearTimeout(this.searchTimeoutId);
      this.isSearching = true;
      this.searchTimeoutId = setTimeout(() => {
        this.loadArticulos();
      }, 1000 * this.timeoutSeconds);
    },
    toggleArticulo(articuloId) {
      this.$trace("lsw-wiki.methods.toggleArticulo");
      const pos = this.openedArticulos.indexOf(articuloId);
      if(pos === -1) {
        this.openedArticulos.push(articuloId);
      } else {
        this.openedArticulos.splice(pos, 1);
      }
    }
  },
  watch: {
    
  },
  async mounted() {
    try {
      this.$trace("lsw-wiki.mounted");
      await this.loadArticulos();
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswWiki API