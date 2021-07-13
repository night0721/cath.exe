function rndint(max, min) {
  return Math.floor(Math.random() * (max - (min ? min : 0))) + (min ? min : 0);
}
function random() {
  const num = Math.floor(Math.random() * 2);
  return num === 1;
}
function timer(timestamp) {
  const timeLeft = timestamp;
  const days = Math.floor(timeLeft / 86400000);
  const hours = Math.floor(timeLeft / 3600000) - days * 24;
  const minutes = Math.floor(timeLeft / 60000) - days * 1440 - hours * 60;
  const seconds =
    Math.floor(timeLeft / 1000) - days * 86400 - hours * 3600 - minutes * 60;
  const mseconds = timeLeft / 1000 - days * 86400 - hours * 3600 - minutes * 60;
  let string = "";
  if (days) string = string + `${days} ${days == 1 ? "day " : "days "}`;
  if (hours) string = string + `${hours} ${hours == 1 ? "hour " : "hours "}`;
  if (minutes)
    string = string + `${minutes} ${minutes == 1 ? "minute " : "minutes "}`;
  if (seconds)
    string = string + `${seconds} ${seconds == 1 ? "second " : "seconds "}`;
  if (!string.length) string = `${mseconds.toFixed(1)} second`;
  return string;
}
function sleep(ms) {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}
function toHHMMSS(str) {
  var sec_num = parseInt(str, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}
module.exports = { rndint, random, timer, sleep, toHHMMSS };
