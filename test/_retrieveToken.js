module.exports = function(conf) {

  var TOKEN_KEY = conf.TOKEN_KEY;
  return retrieveToken;

  function retrieveToken(r) {
    var cookie = r.headers['set-cookie'], token = null;
    return Array.isArray(cookie) && cookie.forEach(function(v) {
      if(v.indexOf(TOKEN_KEY) != 0)
        return;
      token = v.split(';')[0].split('=')[1];
    }), token;
  }

};
