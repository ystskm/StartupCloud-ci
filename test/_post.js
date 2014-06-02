/* post */
module.exports = function(conf) {

  var IsLocal = require('./_IsLocal.js');
  var makePath = require('./_makePath.js')(IsLocal);

  var protocol = require(IsLocal ? 'http': 'https');
  var service_host = IsLocal ? 'localhost': 'startup.cloudplus.me';
  var TOKEN_KEY = conf.TOKEN_KEY;

  console.log('');
  console.log('[_post.js] IsLocal=' + IsLocal);
  console.log('');

  return post;

  function post(p, t, body, testCallback) {

    var options = {

      hostname: service_host,
      path: makePath(p),
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Node/0.10.26',
        'Accept-Language': 'ja,en-US;q=0.8,en;q=0.6'
      }

    };

    if(body.token)
      options.headers['Cookie'] = [TOKEN_KEY + '=' + body.token],
        delete body.token;

    var at = '[' + body.action + ']', rd = '';
    var req = protocol.request(options, function(r) {

      t.equal(r.statusCode, 200, at);
      r.on('data', function(d) {
        rd += d.toString();
      }).on('end', function() {
        t.ok(rd.length != 0, at + ' response size: ' + rd.length);
        try {
          var d = JSON.parse(rd);
          testCallback(null, d, r);
        } catch(e) {
          testCallback(e);
        }
      });

    }).on('error', testCallback);

    req.write(JSON.stringify(body));
    req.end();

  }
};
