(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswLazyLoads'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswLazyLoads'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  // @code.start: LswLazyLoads class | @section: Lsw LazyLoader API » LswLazyLoads class
  
  LswLazyLoader.global.register({
    alias: "highlight.js:global",
    url: "assets/lib/highlight/highlight.js",
    confirmer: () => typeof hljs !== "undefined",
    getter: () => hljs,
    type: "scriptSrc",
  });
  
  LswLazyLoader.global.register({
    alias: "highlight.js:themes:default",
    url: "assets/lib/highlight/styles/default.min.css",
    type: "linkStylesheet",
    once: true,
  });
  
  LswLazyLoader.global.register({
    alias: "highlight.js:themes:monokai",
    url: "assets/lib/highlight/styles/monokai.min.css",
    type: "linkStylesheet",
    once: true,
  });
  
  LswLazyLoader.global.register({
    alias: "pegjs",
    url: "assets/lib/pegjs/pegjs.js",
    type: "scriptSrc",
    once: true,
    confirmer: () => typeof pegjs !== "undefined",
  });
  
  LswLazyLoader.global.register({
    alias: "beautifier",
    url: "assets/lib/beautifier/beautifier.js",
    type: "scriptSrc",
    once: true,
    confirmer: () => typeof beautifier !== "undefined",
  });
  
  LswLazyLoader.global.register({
    alias: "babel",
    url: "assets/lib/babel/babel.js",
    type: "scriptSrc",
    once: true,
    confirmer: () => typeof Babel !== "undefined",
  });

  class LswLazyLoads {

    static loadHighlightJs() {
      return Promise.all([
        LswLazyLoader.global.load("highlight.js:global"),
        // LswLazyLoader.global.load("highlight.js:themes:default"),
        LswLazyLoader.global.load("highlight.js:themes:monokai"),
      ]).then(() => {
        hljs.highlightAll();
      });
    }

    static loadPegjs() {
      return LswLazyLoader.global.load("pegjs");
    }

    static loadBeautifier() {
      return LswLazyLoader.global.load("beautifier");
    }

    static loadHtml2Pdf() {
      return LswLazyLoader.global.load("html2pdf");
    }

    static loadBabel() {
      return LswLazyLoader.global.load("babel");
    }

  };

  return LswLazyLoads;

  // @code.end: LswLazyLoads class

});
