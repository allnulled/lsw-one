// @code.start: LswConfigurationsPage API | @$section: Vue.js (v2) Components » LswConfigurationsPage component
// Change this component at your convenience:
Vue.component("LswConfigurationsPage", {
  template: $template,
  props: {
    
  },
  data() {
    this.$trace("lsw-configurations-page.data", arguments);
    return {
      selectedSection: "datos",
    };
  },
  methods: {
    selectSection(seccion) {
      this.$trace("lsw-configurations-page.methods.selectSection");
      this.selectSection = seccion;
    },
    async startExportarAJson() {
      this.$trace("lsw-configurations-page.methods.startExportarAJson");
      const allData = await LswDatabase.exportDatabase("lsw_default_database");
      this.$dialogs.open({
        title: "Exportar base de datos a JSON",
        template: `<div class="pad_1">
          <div class="flex_row centered">
            <div class="flex_100 pad_1">Exportación a JSON:</div>
            <div class="flex_1 pad_1">
              <button class="supermini nowrap" v-on:click="copyToClipboard">Copiar</button>
            </div>
          </div>
          <textarea class="width_100" style="min-height: 220px;" v-model="jsonData" disabled="true"></textarea>
          <hr />
          <div class="pad_1 text_align_right">
            <button class="supermini" v-on:click="cancel">Cancelar</button>
          </div>
        </div>`,
        factory: {
          data: {
            jsonData: JSON.stringify(allData, null, 2),
          },
          methods: {
            copyToClipboard() {
              this.$trace("Dialogo.exportar_a_json.methods.copyToClipboard");
              this.$window.navigator.clipboard.writeText(this.jsonData);
              this.$lsw.toasts.send({
                title: "¡Texto copiado!",
                text: "El texto fue copiado con éxito."
              });
            }
          }
        }
      })
    },
    async startImportarDeJson() {
      this.$trace("lsw-configurations-page.methods.startImportarDeJson");
      const resultado = await this.$dialogs.open({
        title: "Importar JSON a base de datos",
        template: `<div class="pad_1">
          <div class="flex_row centered">
            <div class="flex_100 pad_1">Importación de JSON:</div>
          </div>
          <textarea class="width_100" style="min-height: 220px;" v-model="value.importation" disabled="true" placeholder="Por ejemplo: {store:[{},{},{}]}"></textarea>
          <hr />
          <div class="pad_1 text_align_right">
            <button class="supermini danger_button" v-on:click="sendForm">Importar</button>
            <button class="supermini" v-on:click="cancel">Cancelar</button>
          </div>
        </div>`,
        factory: {
          data: {
            value: {
              importation: "",
            }
          },
          methods: {
            sendForm() {
              this.$trace("Dialogo.importar_de_json.methods.sendForm");
              this.validateImportation();
              return this.accept();
            },
            validateImportation() {
              this.$trace("Dialogo.importar_de_json.methods.validateImportation");
              try {
                JSON.parse(this.value.importation);
              } catch (error) {
                this.$lsw.toasts.send({
                  title: "⛔️ Error al parsear JSON",
                  text: `La importación se interrumpió.`
                });
                throw error;
              }
            }
          }
        }
      });
      if(typeof resultado !== "object") {
        return false;
      }
      let data = undefined;
      try {
        data = JSON.parse(resultado.importation);
      } catch (error) {
        return this.$lsw.toasts.send({
          title: "⛔️ Error al parsear JSON",
          text: `La importación falló.`
        });
      }
      // @OK:
      await LswDatabase.importToDatabase("lsw_default_database", data);
      return this.$lsw.toasts.send({
        title: "👍 Importación completada",
        text: `La importación fue un éxito.`
      });
    },
    async startResetearBaseDeDatos() {
      this.$trace("lsw-configurations-page.methods.startResetearBaseDeDatos");
      const confirmation = await this.$dialogs.open({
        title: "Resetear la base de datos",
        template: `<div class="pad_1">
          <div class="text_align_center">
            <div class="pad_1 font_weight_bold">¡CUIDADO!</div>
            <div class="pad_1 pad_top_0">¿Seguro que quieres resetear la base de datos?</div>
            <div class="pad_1 pad_top_0">Considera que perderás todos los datos.</div>
          </div>
          <hr />
          <div class="pad_1 text_align_right">
            <button class="supermini danger_button" v-on:click="accept">Aceptar</button>
            <button class="supermini" v-on:click="cancel">Cancelar</button>
          </div>
        </div>`,
        factory: {
          data: { value: {} },
          methods: {}
        }
      });
      if(typeof confirmation !== "object") return;
      console.log("Confirmed:", confirmation);
    },
  },
  mounted() {
    this.$trace("lsw-configurations-page.mounter");
    
  },
});
// @code.end: LswConfigurationsPage API