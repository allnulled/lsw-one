(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswConfigurer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswConfigurer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  // @TODO...
  const LswConfigurer = class {

    constructor(parentConfigurer = null) {
      this.$parent = parentConfigurer;
      this.$state = {};
    }

    configure(stateOptions = {}) {
      Object.assign(this.$state, stateOptions);
    }

    get(key, defaultValue = undefined) {
      let target = this;
      Iterating_parents:
      while(!!target) {
        if(key in target.$state) {
          return target.$state[key];
        }
        target = target.$parent;
      }
      return defaultValue;
    }

  }

});