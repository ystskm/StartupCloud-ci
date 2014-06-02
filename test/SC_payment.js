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
  T_getToken: T_getToken,
  T_unpayable: T_unpayable,
  T_payableNg: T_payableNg,
  T_checkCard: T_checkCard,
  T_payableOk: T_payableOk,
  T_charge: T_charge,
  T_kickpay: T_kickpay,
  T_logout: T_logout,
  checkResult: checkResult
};

for( var i in Cases)
  cases[i] = Cases[i];

function T_getToken(t) {

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

function T_unpayable(t) {
  var body = {};

  body.action = 'unpayable';
  body.token = _token1;

  post('/r_payment/', t, body, doneWrap(t, body.action, function(e, d, r) {
    t.equal(d.ok, 1, 'Unpayabled.');
  }));
}

function T_payableNg(t) {
  var body = {};

  body.action = 'checkPayable';
  body.token = _token1;

  post('/r_payment/', t, body, doneWrap(t, body.action, function(e, d, r) {
    t.equal(d.ok, 1);
    t.equal(d.data.payable, false);
  }));
}

function T_checkCard(t) {
  var body = {};

  body.action = 'checkCard';
  body.token = _token1;

  body.card = {
    name: 'KEI KUBO',
    number: '4242-4242-4242-4242',
    exp_month: '10',
    exp_year: '2015',
    cvc: '111'
  };

  post('/r_payment/', t, body, function(e, d, r) {
    t.equal(d.ok, 1);

    body.action = 'updateCard';
    body.token = _token1;

    for( var i in d.data)
      body.card[i] = d.data[i];

    post('/r_payment/', t, body, doneWrap(t, body.action, function(e, d, r) {
      t.equal(d.ok, 1);
    }))
  });
}

function T_payableOk(t) {
  var body = {};

  body.action = 'checkPayable';
  body.token = _token1;

  post('/r_payment/', t, body, doneWrap(t, body.action, function(e, d, r) {
    t.equal(d.ok, 1);
    t.equal(d.data.payable, true);
  }));
}

function T_charge(t) {
  var body = {};

  body.action = 'charge';
  body.token = _token1;

  body.prop = {
    group: 'synquery'
  };

  body.data = {
    amount: 20000
  };

  post('/r_payment/', t, body, doneWrap(t, body.action, function(e, d, r) {
    t.equal(d.ok, 1);
  }));
}

function T_kickpay(t) {
  var body = {};

  body.action = 'kickPay';
  body.token = _token1;

  body.prop = {
    group: 'synquery'
  };

  post('/r_payment/', t, body, doneWrap(t, body.action, function(e, d, r) {
    t.equal(d.ok, 1);
  }));
};

function T_logout(t) {

  var body = {};
  body.plugin_call = 'login/data';
  body.action = 'logout', body.token = _token1;

  post('/', t, body, doneWrap(t, body.action, function(e, d, r) {
    t.equal(d.ok, 1);
  }));

}

function checkResult(t) {
  var body = {};
  /*
  post('plugin/login', t, body, function(e, r) {
    if(e)
      throw e;
    t.done();
  });*/
  t.done(); // TODO
}
