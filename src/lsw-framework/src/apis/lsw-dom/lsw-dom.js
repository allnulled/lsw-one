(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswDom'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswDom'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  

  /**
   * 
   * 
   * @$section: Lsw Dom API » LswDom class
   * @type: class
   * @extends: Object
   * @vendor: lsw
   * @namespace: LswDom
   * @source code: La clase está definida así:
   * 
   */
  // @code.start: LswDom class | @section: Lsw Dom API » LswDom class
  const LswDom = class {

    static collectLeaves(originalCollection, selectorSequence = []) {
      $ensure(originalCollection).type("object");
      $ensure(selectorSequence).type("object").to.be.array();
      let collection = Array.isArray(originalCollection) ? originalCollection : [originalCollection];
      const mapperFactory = selector => element => {
        return [].concat(element.querySelectorAll(selector));
      };
      for(let indexSelector=0; indexSelector<selectorSequence.length; indexSelector++) {
        const selector = selectorSequence[indexSelector];
        const subnodes = collection.map(mapperFactory(selector)).flat();
        collection = [].concat(subnodes);
      }
      return collection;
    }

    static getClosestParent(originalElement, selector) {
      $ensure(originalElement).type("object").to.be.instanceOf(HTMLElement);
      $ensure(selector).type("string");
      let element = originalElement.parentElement;
      while(element && (element !== document)) {
        if(element.matches(selector)) {
          return element;
        }
        element = element.parentElement;
      }
      return null;
    }

    static getClosestChildren(originalElement, selector) {
      $ensure(originalElement).type("object").to.be.instanceOf(HTMLElement);
      $ensure(selector).type("string");
      return [...originalElement.querySelectorAll(selector)].filter(element => {
        return this.getClosestParent(element, selector) === originalElement;
      });
    }

  };
  // @code.end: LswDom class

  return LswDom;

});