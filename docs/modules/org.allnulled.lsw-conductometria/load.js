LswLifecycle.hooks.register("app:all_loaded", "startJobs:org.allnulled.lsw-conductometria", async function () {
  Setup_intruder_jobs: {
    // RUTINER A LOS 2:20-3 MINUTOS DE ENTRAR, MENSAJE:
    const milisegundoInicial = (60) + 0;
    const milisegundoFinal = milisegundoInicial + 60;
    const millisecondsToWait = LswRandomizer.getRandomIntegerBetween(milisegundoInicial, milisegundoFinal) * 1000;
    Vue.prototype.$lsw.intruder.addJob({
      id: "Job para memorizar Rutiner",
      timeout: millisecondsToWait,
      dialog: {
        id: "rutiner-basico",
        title: "¿Recuerdas el Rutiner?",
        template: `
          <div>
            <div class="pad_1">
              <div class="" v-if="rutinerText">
                <div class="rutiner_box pad_2" v-html="rutinerText"></div>
              </div>
            </div>
            <div class="text_align_right pad_right_1">
              <button v-on:click="accept" class="margin_left_1">Aceptar</button>
            </div>
          </div>
        `,
        factory() {
          return {
            data() {
              return {
                rutinerText: false,
              }
            },
            methods: {
              async loadRutinas() {
                const markdownText = await this.$lsw.fs.read_file("/kernel/agenda/rutiner.env");
                this.rutinerText = marked.parse(markdownText);
              }
            },
            mounted() {
              this.loadRutinas();
            }
          }
        }
      }
    });
  }
});