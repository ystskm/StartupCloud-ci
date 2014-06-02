// login test for PC
t.equal($('.nav_login').length, 1);
t.wait('ログインパネルの表示', function() {
  $('.nav_login').click();
  var $sw = $($('body iframe').get(0).contentWindow.document)
  return $sw.find('#loginId:visible').length === 1;
}, doLogin);

function doLogin() {

  var $sw = $($('body iframe').get(0).contentWindow.document)
  $sw.find('#loginId').val('windingdolphin@hotmail.com');
  $sw.find('#loginPw').val('sakamoto2');

  t.equal($sw.find('.action_login').length, 1);
  t.equal($sw.find('.btn.action_login').length, 1);

  $sw.find('.btn.action_login').mouseup();
  t.wait('ログインアクション', function() {
    return $sw.find('.service-wrap').children().length == 5;
  }, finishTest);

}

function finishTest() {
  t.ok(true, 'Login successfully.');
  t.done();
}
