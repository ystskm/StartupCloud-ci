module.exports = suites;
function suites(wt) {
  wt.registerSuite('login', ['isIndex', 'test_login'], 30000);
}
