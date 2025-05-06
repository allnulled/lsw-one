// @code.start: LswWikiArticulos API | @$section: Vue.js (v2) Components » Lsw Wiki API » LswWikiArticulos component
Vue.component("LswWikiArticulos", {
  name: "LswWikiArticulos",
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-wiki-articulos.data");
    return {
      articulos: false,
      isSearching: false,
      searchText: "",
      timeoutId: undefined,
      timeoutSeconds: 0.4,
      openedArticulos: [],
    };
  },
  methods: {
    async loadArticulos() {
      this.$trace("lsw-wiki-articulos.methods.loadArticulos");
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
      const articulosOrdenados = articulos.sort((a1, a2) => {
        const f1 = a1.tiene_fecha || 0;
        const f2 = a2.tiene_fecha || 0;
        if(f1 < f2) return 1;
        if(f1 > f2) return -1;
        return -1;
      });
      this.openedArticulos = [];
      this.articulos = articulosOrdenados;
      this.isSearching = false;
    },
    loadArticulosDelayed() {
      this.$trace("lsw-wiki-articulos.methods.loadArticulosDelayed");
      clearTimeout(this.searchTimeoutId);
      this.isSearching = true;
      this.searchTimeoutId = setTimeout(() => {
        this.loadArticulos();
      }, 1000 * this.timeoutSeconds);
    },
    toggleArticulo(articuloId) {
      this.$trace("lsw-wiki-articulos.methods.toggleArticulo");
      const pos = this.openedArticulos.indexOf(articuloId);
      if(pos === -1) {
        this.openedArticulos.push(articuloId);
      } else {
        this.openedArticulos.splice(pos, 1);
      }
    },
    async createArticulo() {
      this.$trace("lsw-wiki-articulos.methods.createArticulo");
      const articulosComponent = this;
      await this.$dialogs.open({
        id: LswRandomizer.getRandomString(10),
        title: "Crear nuevo artículo",
        template: `
          <div>
            <lsw-schema-based-form
              :on-submit="submitCallback"
              :model="{
                  connection: $lsw.database,
                  databaseId: 'lsw_default_database',
                  tableId: 'Articulo',
                  rowId: -1,
              }"
            />
          </div>
        `,
        factory: {
          methods: {
            async submitCallback(value) {
              try {
                this.$trace("Dialogs.CrearNuevoArticulo.methods.submitCallback");
                await this.$lsw.database.insert("Articulo", value);
                await this.$lsw.toasts.send({
                  title: "Artículo añadido correctamente",
                  text: "El artículo ha sido añadido con éxito."
                });
                this.close();
                articulosComponent.loadArticulos();
              } catch (error) {
                console.log(error);
                await this.$lsw.toasts.send({
                  title: "Error al añadir artículo",
                  text: "No se pudo añadir el artículo por un error: " + error.message,
                  background: "red",
                });
              }

            }
          }
        }
      })
    },
    async editArticulo(articulo) {
      this.$trace("lsw-wiki-articulos.methods.editArticulo");
      const articulosComponent = this;
      await this.$lsw.dialogs.open({
        title: "Editar artículo",
        template: `
          <div>
            <lsw-schema-based-form
              :show-breadcrumb="false"
              :on-submit="(value) => submitCallback(value)"
              :on-delete-row="deleteCallback"
              :model="{
                  connection: $lsw.database,
                  databaseId: 'lsw_default_database',
                  tableId: 'Articulo',
                  rowId: articuloId,
              }"
            />
          </div>
        `,
        factory: {
          data: { articuloId: articulo.id },
          methods: {
            async submitCallback(value) {
              this.$trace("Dialogs.EditarArticulo.methods.submitCallback");
              try {
                await this.$lsw.database.update("Articulo", this.articuloId, value);
                await this.$lsw.toasts.send({
                  title: "Artículo actualizado correctamente",
                  text: "El artículo ha sido actualizado con éxito."
                });
                this.close();
                articulosComponent.loadArticulos();
              } catch (error) {
                console.log(error);
                await this.$lsw.toasts.send({
                  title: "Error al actualizar artículo",
                  text: "No se pudo actualizar el artículo por un error: " + error.message,
                  background: "red",
                });
              }
            },
            async deleteCallback() {
              this.$trace("Dialogs.EditarArticulo.methods.deleteCallback");
              this.close();
              articulosComponent.loadArticulos();
              await this.$lsw.toasts.send({
                title: "Artículo eliminado correctamente",
                text: "El artículo se eliminó con éxito.",
              });
            }
          }
        }
      });
    }
  },
  watch: {
    
  },
  async mounted() {
    try {
      this.$trace("lsw-wiki-articulos.mounted");
      await this.loadArticulos();
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswWikiArticulos API