let CONST = require('./_const');

module.exports = function (date) {
  let endTime = new Date(date).getTime();
  let startTime = CONST.startDate.getTime();
  let flag = 1;
  let interval = endTime - startTime;
  if (interval < 0) {
    interval = -interval;
    flag = -1;
  }
  // 预留1分钟误差
  interval -= 60000;
  return flag * Math.ceil(interval / 24 / 60 / 60 / 1000);
};