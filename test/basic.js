/***/
var nodeunit = require('nodeunit'), cases = {};
module.exports = nodeunit.testCase(cases);

cases.b0 = function(t) {
  t.ok(true, 'synchronize test.'), t.done();
};

cases.b1 = function(t) {
  setTimeout(function() {
    t.ok(true, 'async test.'), t.done();
  }, 4);
};
