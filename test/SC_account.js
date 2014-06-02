/***/
var nodeunit = require('nodeunit'), cases = {};
module.exports = nodeunit.testCase(cases);

var token = null;
var conf = require('./_config.js');
var post = require('./_post.js')(conf);

var doneWrap = require('./_doneWrap.js');
var retrieveToken = require('./_retrieveToken.js')(conf);

var SUDO_U = conf.SudoAccount.Id, S_PW = conf.SudoAccount.Pw;
var TEST_U = conf.TestAccount.Id, T_PW = conf.TestAccount.Pw;
var _token0 = null, _token1 = null;

var Cases = {
  S_getToken: S_getToken,
  T_getToken: T_getToken,
  T_suspend: T_suspend,
  T_loginNg: T_loginNg,
  S_signupOk: S_signupOk,
  T_loginOk: T_loginOk,
  T_logout: T_logout,
  S_logout: S_logout,
  S_signupNg: S_signupNg,
  checkResult: checkResult
};

for( var i in Cases)
  cases[i] = Cases[i];

function S_getToken(t) {

  var body = {};
  body.plugin_call = 'login/data';
  body.action = 'login';

  body.id = SUDO_U;
  body.password = S_PW;

  post('/', t, body, doneWrap(t, body.action, function(e, d, r) {
    _token0 = retrieveToken(r);
    t.ok(!!_token0, 'getToken for "' + SUDO_U + '".');
  }));

}

function T_getToken(t) {

  var body = {};
  body.plugin_call = 'login/data';
  body.action = 'login';

  body.id = TEST_U;
  body.password = T_PW;

  post('/', t, body, doneWrap(t, body.action, function(e, d, r) {
    if(d.ok == 0) // user data is not created yet
      return t.ok(true, '"' + TEST_U + '" will be create(0).');
    _token1 = retrieveToken(r);
    t.ok(!!_token1, 'getToken for "' + TEST_U + '".');
  }));

}

function T_suspend(t) {
  var body = {};
  body.plugin_call = 'login/data';
  body.action = 'suspend', body.token = _token1;
  post('/', t, body, doneWrap(t, body.action, function(e, d, r) {
    if(_token1 == null && d.ok == 0)
      return t.ok(true, '"' + TEST_U + '" will be create(1).')
    t.equal(d.ok, 1, 'suspend "' + TEST_U + '".')
  }));
};

function T_loginNg(t) {

  var body = {};
  body.plugin_call = 'login/data';
  body.action = 'login';

  body.id = TEST_U;
  body.password = T_PW;

  post('/', t, body, doneWrap(t, body.action, function(e, d, r) {
    t.equal(d.ok, 0, 'Suspended login should be failed.');
  }));

}

function S_signupOk(t) {

  var body = {};
  body.plugin_call = 'login/data';
  body.action = 'signup';

  body.id = TEST_U;
  body.password = T_PW, body.token = _token0;
  body.activate = true, body.consolidate = true;

  // made by logged in user "manage"
  // status "suspended" will be removed.
  // THIS ACTION WILL SEND THE CUSTOMER.
  // AND IF EVIL USER FOUND, WE SHOUD FREESE HIM.

  post('/', t, body, doneWrap(t, body.action, function(e, d, r) {
    t.equal(d.ok, 1);
  }));

};

function T_loginOk(t) {

  var body = {};
  body.plugin_call = 'login/data';
  body.action = 'login';

  body.id = TEST_U;
  body.password = T_PW;

  post('/', t, body, doneWrap(t, body.action, function(e, d, r) {
    _token1 = retrieveToken(r);
    t.ok(!!_token1, 'getToken for "' + TEST_U + '".');
  }));

}

function T_logout(t) {

  var body = {};
  body.plugin_call = 'login/data';
  body.action = 'logout', body.token = _token1;

  post('/', t, body, doneWrap(t, body.action, function(e, d, r) {
    t.equal(d.ok, 1);
  }));

};

function S_logout(t) {

  var body = {};
  body.plugin_call = 'login/data';
  body.action = 'logout', body.token = _token0;

  post('/', t, body, doneWrap(t, body.action, function(e, d, r) {
    t.equal(d.ok, 1);
  }));

};

function S_signupNg(t) {

  var body = {};
  body.plugin_call = 'login/data';
  body.action = 'signup';

  body.id = TEST_U;
  body.password = T_PW, body.token = _token0;

  post('/', t, body, doneWrap(t, body.action, function(e, d, r) {
    t.equal(d.ok, 0, 'Token is already inactivated.');
  }));

};

function checkResult(t) {
  var body = {};
  /*
  post('plugin/login', t, body, function(e, r) {
    if(e)
      throw e;
    t.done();
  });*/
  t.done(); // TODO
};
