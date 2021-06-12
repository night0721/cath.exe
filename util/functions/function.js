function rndint(max, min) {
  return Math.floor(Math.random() * (max - (min ? min : 0))) + (min ? min : 0);
}
function random() {
  const num = Math.floor(Math.random() * 2);
  return num === 1;
}
module.exports = { rndint, random };
