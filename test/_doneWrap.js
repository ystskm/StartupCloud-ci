module.exports = function doneWrap(t, act, fn) {
  return function(e, d, r) {
    var err = e;
    try {
      if(e)
        throw e;
      fn(null, d, r)
    } catch(e) {
      err = e;
    }
    t.ok(!err, err && err.message || 'End of ' + act + '.');
    t.done();
  };
}
