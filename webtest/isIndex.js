t.async();
if($('#main-container').children().length == 1) { // service page
  t.ok(true, 'Clean up cookie.')
  t.clearCookie('/'), t.reload();
} else {
  t.ok(true, 'Check ok. ( document.cookie = ' + document.cookie + ' )');
  t.done();
}
