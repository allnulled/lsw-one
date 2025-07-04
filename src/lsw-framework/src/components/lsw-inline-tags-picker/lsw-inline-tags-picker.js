// @code.start: LswInlineTagsPicker API | @$section: Vue.js (v2) Components » LswInlineTagsPicker component
Vue.component("LswInlineTagsPicker", {
  template: $template,
  props: {
    from: {
      type: Object,
      default: () => []
    },
    field: {
      type: String,
      required: true,
    },
    onChoose: {
      type: [Function, Boolean],
      default: () => false,
    }
  },
  data() {
    this.$trace("lsw-inline-tags-picker.data");
    return {
      fromData: this.from,
      digestedData: [],
      searchText: "",
      selectedRow: false,
    };
  },
  methods: {
    digestSearch() {
      this.$trace("lsw-inline-tags-picker.methods.digestSearch");
      if (this.searchText.trim() === "") {
        this.digestedData = this.fromData;
        return;
      }
      this.digestedData = this.fromData.filter(row => {
        return JSON.stringify(row).toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
      });
    },
    selectRow(row) {
      this.$trace("lsw-inline-tags-picker.methods.selectRow");
      this.selectedRow = row;
      if (typeof this.onChoose === "function") {
        this.onChoose(row, this);
      }
    }
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-inline-tags-picker.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});
// @code.end: LswInlineTagsPicker API