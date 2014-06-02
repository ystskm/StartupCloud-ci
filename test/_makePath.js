module.exports = function(IsLocal) {
  return IsLocal ? function(p) {
    return '/StartupCloud' + p;
  }: function(p) {
    return p;
  };
}
