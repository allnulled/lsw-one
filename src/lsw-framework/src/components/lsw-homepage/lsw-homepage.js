const homepage_apps_events = {
  "base de datos": function() {
    
  },
  "calendario": function() {
    
  },
  "sistema de ficheros": function() {
    
  },
  "configuraciones": function() {
    
  },
  "calendario": function() {
    
  },
  "tareas posteriores": function() {
    
  },
  "tareas anteriores": function() {
    
  },
  "conductometria": function() {
    
  },
  "notas": function() {
    
  },
  "nueva nota": function() {
    
  },
  "enciclopedia": function() {
    
  },
  "nuevo articulo": function() {
    
  },
};

// @code.start: LswHomepage API | @$section: Vue.js (v2) Components » Lsw Toasts API » LswHomepage component
Vue.component("LswHomepage", {
  template: $template,
  props: {
    appsViewer: {
      type: Object,
      required: true,
    }
  },
  data() {
    this.$trace("lsw-homepage.data");
    return {};
  },
  methods: {
    async abrirApp(appId) {
      this.$trace("lsw-homepage.methods.abrirApp");
      this.$lsw.toasts.send({
        title: "Yendo a: " + appId,
      });
      this.appsViewer.selectApplication(appId);
    }
  },
  watch: {},
  mounted() {
    this.$trace("lsw-homepage.mounted");
    
  },
  unmounted() {
    this.$trace("lsw-homepage.unmounted");
    
  }
});
// @code.end: LswHomepage API