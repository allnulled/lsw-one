// @code.start: LswVolatileDatabaseVisualizer API | @$section: Vue.js (v2) Components » LswVolatileDatabaseVisualizer component
Vue.component("LswVolatileDatabaseVisualizer", {
  template: $template,
  props: {
    initialData: {
      type: [Array, Boolean],
      default: () => {},
    },
  },
  data() {
    this.$trace("lsw-volatile-database-visualizer.data");
    const visualizer = this;
    return {
      currentData: this.initialData || LswVolatileDatabase.global.find(),
      extraTableButtons: [{
        text: "➕",
        event: async (component, event) => {
          this.$trace("lsw-volatile-database-visualizer.extraTableButtons[➕].event");
          this.$lsw.dialogs.open({
            title: "Editar dato volátil",
            template: `
              <div class="pad_1">
                <lsw-volatile-database-row-editor
                  table="?"
                  id="?"
                  :closer="closeAndRefresh"
                />
              </div>
            `,
            factory: {
              data: {},
              methods: {
                closeAndRefresh() {
                  this.$trace("lsw-volatile-database-visualizer.extraTableButtons[➕].dialog[0].methods.closeAndRefresh");
                  const allData = LswVolatileDatabase.global.find();
                  component.reloadInput(allData);
                  return this.close();
                }
              }
            }
          });
        }
      }, {
        text: "📡",
        event: async (component, event) => {
          this.$trace("lsw-volatile-database-visualizer.extraTableButtons[🛜].event");
          const allData = await LswVolatileDatabase.global.find();
          component.reloadInput(allData);
        }
      }],
      extraRowButtons: [{
        text: "↗️",
        event: (row, rowIndex, attachedColumn, component) => {
          this.$trace("lsw-volatile-database-visualizer.extraRowButtons[0].event");
          this.$lsw.dialogs.open({
            title: "Editar dato volátil",
            template: `
              <div class="pad_1">
                <lsw-volatile-database-row-editor
                  :table="table"
                  :id="id"
                  :closer="closeAndRefresh"
                />
              </div>
            `,
            factory: {
              data: {
                table: row.$table,
                id: row.id,
              },
              methods: {
                closeAndRefresh() {
                  this.$trace("lsw-volatile-database-visualizer.extraRowButtons[↗️].dialog[0].methods.closeAndRefresh");
                  const allData = LswVolatileDatabase.global.find();
                  component.reloadInput(allData);
                  return this.close();
                }
              }
            }
          });
        }
      }, {
        text: "❌",
        event: async (row, rowIndex, attachedColumn, component) => {
          this.$trace("lsw-volatile-database-visualizer.extraRowButtons[0].event");
          const confirmation = await this.$lsw.dialogs.open({
            title: "Eliminar fila volátil",
            template: `
              <div class="pad_1">
                <div>¿Seguro que quieres eliminar la fila volátil {{table}}#{{id}}?</div>
                <pre class="codeblock">{{ JSON.stringify(row, null, 2) }}</pre>
                <hr />
                <div class="flex_row centered">
                  <div class="flex_100"></div>
                  <div class="flex_1 pad_left_1">
                    <button class="supermini danger_button" v-on:click="() => accept(true)">Eliminar</button>
                  </div>
                  <div class="flex_1 pad_left_1">
                    <button class="supermini " v-on:click="cancel">Cancelar</button>
                  </div>
                </div>
              </div>
            `,
            factory: {
              data: {
                row: row,
                table: row.$table,
                id: row.id,
              }
            }
          });
          if(confirmation === true) {
            LswVolatileDatabase.global.delete(row.$table, row.id);
            const allData = LswVolatileDatabase.global.find();
            component.reloadInput(allData);
          }
        }
      }].reverse()
    };
  },
  methods: {
    load() {
      this.$trace("lsw-volatile-database-visualizer.methods.load");
    }
  },
  watch: {},
  mounted() {
    this.$trace("lsw-volatile-database-visualizer.mounted");

  }
});
// @code.end: LswVolatileDatabaseVisualizer API