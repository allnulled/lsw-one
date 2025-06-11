(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswDatamanager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswDatamanager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const LswDatamanager = class {

    constructor(proxyId) {
      
    }

  };
  
  return LswDatamanager;

});