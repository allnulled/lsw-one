(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswVue2'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswVue2'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const LswVue2 = class {

    static getClosestParent(component, filterCallback) {
      $ensure(component).type("object");
      $ensure(filterCallback).type("function");
      let parentOf = component;
      do {
        parentOf = parentOf.$parent;
        const isValid = filterCallback(parentOf);
        if (isValid) {
          return parentOf;
        }
      } while (typeof parentOf !== "undefined");
      return undefined;
    }

    static extendComponent(baseComponent = {}) {
      const extendedComponent = Object.assign({}, baseComponent);
      extendedComponent.props = Object.assign({}, baseComponent.props || {});
      extendedComponent.methods = Object.assign({}, baseComponent.methods || {});
      extendedComponent.watch = Object.assign({}, baseComponent.watch || {});
      extendedComponent.computed = Object.assign({}, baseComponent.computed || {});
      return extendedComponent;
    }

  }

  return LswVue2;

});