(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswRandomizer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswRandomizer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {


  /**
   * 
   * 
   * @$section: LswRandomizer API » LswRandomizer class
   * @type: class
   * @extends: Object
   * @vendor: lsw
   * @namespace: LswRandomizer
   * @source code: La clase está definida así:
   * 
   */
  // @code.start: LswRandomizer class | @$section: LswRandomizer API » LswRandomizer class
  const LswRandomizer = class {

    static $defaultAlphabet = "abcdefghijklmnopqrstuvwxyz";

    static getRandomIntegerBetween(start = 0, end = 100) {
      const min = Math.ceil(Math.min(start, end));
      const max = Math.floor(Math.max(start, end));
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomString(len, alphabet = this.$defaultAlphabet) {
      let out = "";
      while (out.length < len) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
      }
      return out;
    }

    static getRandomItem(list) {
      return list[Math.floor(Math.random() * list.length)];
    }

    static getRandomObject(totalProps = [0, 10], listOf = false) {
      let randomProps = totalProps;
      if (Array.isArray(totalProps)) {
        randomProps = this.getRandomIntegerBetween(...totalProps);
      }
      const buildRandomObject = () => {
        const randomObject = {};
        while (Object.keys(randomObject).length < randomProps) {
          const key = this.getRandomString(5);
          const value = this.getRandomString(10);
          randomObject[key] = value;
        }
        return randomObject;
      };
      if (listOf === false) {
        return buildRandomObject();
      }
      const randomList = [];
      for(let index=0; index<listOf; index++) {
        const randomObject = buildRandomObject();
        randomList.push(randomObject);
      }
      return randomList;
    }

  }

  return LswRandomizer;
  // @code.end: LswRandomizer class

});