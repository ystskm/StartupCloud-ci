var os = require('os');
module.exports = (function() {
  return os.hostname().indexOf('sakamoto-no-MacBook-Air') == 0;
})();
