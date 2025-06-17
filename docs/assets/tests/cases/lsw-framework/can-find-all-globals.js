return LswTestRegistry.collect("can find all globals", async function (test) {
  test("can find lsw global", async function () {
    $ensure(typeof lsw).isnt("undefined");
  });
  test("can find Vue.prototype.$lsw global", async function () {
    $ensure(typeof Vue.prototype.$lsw).isnt("undefined");
  });
});