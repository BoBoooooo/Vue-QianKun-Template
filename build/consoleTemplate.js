function now() {
  return new Date().toLocaleString('chinese', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}
function success(a, b) {
  console.log(`\x1B[42m \x1B[37m${now()} ${a}\x1B[39m \x1B[49m ${b}`);
}
function info(a, b) {
  console.log(`\x1B[44m ${now()} ${a} \x1B[49m ${b}`);
}
function err(a, b) {
  console.log(`\x1B[41m \x1B[37m${now()} ${a}\x1B[39m \x1B[49m \x1B[31m${b}\x1B[39m`);
}
module.exports = {
  success,
  info,
  err,
};
