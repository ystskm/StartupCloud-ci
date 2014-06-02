/***/
require('nodeunit-ci').run('basic', __dirname).pipe('loadpage').pipe(
  'SC_account').pipe('SC_payment');
//require('nodeunit-ci').run('basic', __dirname).pipe('account').pipe('payment');
