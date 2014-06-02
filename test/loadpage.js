/***/
var nodeunit = require('nodeunit'), cases = {};
module.exports = nodeunit.testCase(cases);

cases.SCser = function(t) {
  standard(t, 'https://startup.cloudplus.me');
};
cases.SCwww = function(t) {
  standard(t, 'http://www.startup-cloud.co.jp');
};
cases.LTwww = function(t) {
  standard(t, 'http://liberty-technology.biz');
};
cases.ECser = function(t) {
  standard(t, 'https://www.synquery.com/synquery/TK6lBkEf');
};
cases.LSser = function(t) {
  standard(t, 'https://lean.synquery.com/TK6lBkEf');
};
cases.ECwww = function(t) {
  standard(t, 'http://www.east-cloud.co.jp');
};

function standard(t, url) {
  var len = 0, w = require('time-calc')({
    enable: {
      s: false
    }
  });
  var rcl = 'http' + (url.indexOf('https:') == 0 ? 's': '');
  require(rcl).get(url, function(r) {
    var at = '[' + url + ']';
    t.equal(r.statusCode, 200, at), r.on('data', function(d) {
      len += d.length;
    }).on('end', function() {
      t.ok(len != 0, at + ' page size: ' + len + ' load time: ' + w());
      t.done();
    });
  });
}
