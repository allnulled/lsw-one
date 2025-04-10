Vue.component("LswDurationControl", {
  template: $template,
  props: {
    settings: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    this.$trace("lsw-duration-control.data");
    this.validateSettings();
    return {
      uuid: LswRandomizer.getRandomString(5),
      value: this.settings?.initialValue || "",
      isEditable: true,
      isShowingDetails: false,
      submitError: false,
      validateError: false,
    };
  },
  methods: {
    async submit() {
      this.$trace("lsw-text-control.methods.submit");
      try {
        return LswFormtypes.utils.submitControl.call(this);
      } catch (error) {
        this.submitError = error;
        throw error;
      }
    },
    validate() {
      this.$trace("lsw-text-control.methods.validateSettings");
      try {
        return LswFormtypes.utils.validateControl.call(this);
      } catch (error) {
        this.validateError = error;
        throw error;
      }
    },
    validateSettings() {
      this.$trace("lsw-text-control.methods.validateSettings");
      return LswFormtypes.utils.validateSettings.call(this);
    },
    toggleDetails() {
      this.$trace("lsw-duration-control.methods.toggleDetails");
      this.isShowingDetails = !this.isShowingDetails;
    },
    increasePosition(pos) {
      this.$trace("lsw-duration-control.methods.increasePosition");

    },
    decreasePosition(pos) {
      this.$trace("lsw-duration-control.methods.decreasePosition");

    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-duration-control.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});