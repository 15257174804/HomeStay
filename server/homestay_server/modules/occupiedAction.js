let CONST = require('./_const');
// 数据库里的“占用日期”始终为顺序排列
module.exports = {
  isOccupied (agenda, start, end) {
    for (let i = 0; i < agenda.length; i++) {
      if (agenda[i] >= start && agenda[i] < end) {
        return true;
      }
    }
    return false;
  },
  addOccupied (agenda, start, end) {
    if (!this.isOccupied(agenda, start, end)) {
      let j = 0;
      // 将今天以前的日期删除
      let currentDate = new Date().getTime() - CONST.startDate.getTime();
      // 预留一天的误差，相当于把昨天以前的日期删除
      currentDate = Math.ceil(currentDate / 24 / 60 / 60 / 1000) - 1;
      for (let i = 0; i < agenda.length; i++) {
        if (agenda[i] < currentDate) {
          j = i + 1;
        }
        else {
          break;
        }
      }
      agenda.splice(0, j);
      // 将新的占用日期插入日历
      for (let i = 0; i < agenda.length; i++) {
        if (agenda[i] > end) {
          let after = agenda.splice(i, agenda.length - i);
          for (let j = start; j <= end; j++) {
            agenda.push(j);
          }
          agenda = agenda.concat(after);
          return agenda;
        }
      }
    }
    else {
      return false;
    }
  }
};