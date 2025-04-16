(() => {
  let isFirstTime = true;
  const initialCode = `
inc /wherever/you/choose.proto

def correr {
  "definicion": @definicion "Correr es tal"
}

add 2025/01/01
  00:00 correr * 1h
  00:00 saltar * 5min
  00:00 comer * @alimentos [["leche","0.3L"],["cacao","2g"]]

fun yo.correr {
  // Nolose, aquí JS.
}

rel correr
  > cardio * 2
  >> yo.correr

`.trim();
  // Change this component at your convenience:
  Vue.component("App", {
    template: $template,
    props: {
      uuid: {
        type: String,
        default: () => {
          return Vue.prototype.$lsw.utils.getRandomString(10);
        }
      }
    },
    data() {
      return {
        isMounted: false,
        formScope: {},
        userScope: {},
        conductometria: [],
        conductometria_minified_days: [],
        initialContents: initialCode
      };
    },
    methods: {
      goToDocs() {
        this.$trace("App.methods.goToDocs");
        const confirmation = this.$window.confirm("Saldrás de la aplicación con una pestaña nueva, y es un poco incómodo. ¿Estás seguro?");
        if(!confirmation) return;
        this.$window.open("reference/index.html");
      },
      async resetDatabase() {
        this.$trace("App.methods.resetDatabase");
        const confirmacion = this.$window.confirm("Estás seguro que quieres resetear la base de datos?");
        if(!confirmacion) return;
        const reconfirmacion = this.$window.confirm("Seguro, eh?");
        if(!reconfirmacion) return;
        try {
          await this.$lsw.database.close();
        } catch (error) {
          console.log(error);
        }
        try {
          await LswDatabase.deleteDatabase("lsw_default_database");
        } catch (error) {
          console.log(error);
        }
        try {
          this.$lsw.database = await LswDatabase.open("lsw_default_database");
        } catch (error) {
          console.log(error);
        }
      },
      goToAddNota() {
        this.$trace("App.methods.goToAddNota");
        this.$refs.desktop.selectApplication("nueva nota");
      },
      goToAddArticulo() {
        this.$trace("App.methods.goToAddArticulo");
        this.$refs.desktop.selectApplication("nuevo articulo");
      },
      goToAddRecordatorio() {
        this.$trace("App.methods.goToAddRecordatorio");
        this.$refs.desktop.selectApplication("nuevo recordatorio");
      },
      goToAddAccion() {
        this.$trace("App.methods.goToAddAccion");
        this.$refs.desktop.selectApplication("nueva accion");
      },
    },
    mounted() {
      console.log("[*] Application mounted.");
      this.isMounted = true;
      if (isFirstTime) {
        Vue.prototype.$app = this;
        isFirstTime = false;
        window.dispatchEvent(new CustomEvent("lsw_app_mounted", {
          applicationUuid: this.uuid,
          $lsw: this.$lsw,
          appComponent: this,
        }));
      }
    }
  });
})(); 