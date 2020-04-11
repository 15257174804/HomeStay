let pool = require('./mysqlPool');

const SELECT = 'select';
const INSERT = 'insert';
const DELETE = 'delete';
const UPDATE = 'update';

module.exports = (method, table, columns, querySelector, callback) => {
  // console.log(columns, querySelector);
  // method = 'select'|'insert'|'delete'|'update'
  // 规范化method参数
  if (method === 'SELECT') {
    method = 'select';
  }
  else if (method === 'INSERT') {
    method = 'insert';
  }
  else if (method === 'DELETE') {
    method = 'delete';
  }
  else if (method === 'UPDATE') {
    method = 'update';
  }
  // 最终字符串和参数
  let query = '';
  let params = [];
  try{
    // 判断table是否正确
    if (typeof table !== 'string') {
      callback(new Error('Wrong table!'));
    }
    switch (method) {
      case SELECT:
        query += 'SELECT ';
        // 只取一列，column可以为字符串
        if (Array.isArray(columns)) {
          for (let name of columns) {
            query += name + ','
          }
          query = query.slice(0, -1);
        }
        else if (typeof columns === 'string') {
          query += columns;
        }
        else {
          callback(new Error('Wrong column names!'));
        }
        query += ' FROM ' + table;
        break;
      case INSERT:
        query += 'INSERT INTO ' + table;
        // column必须为数组或对象或字符串
        if (typeof columns === 'string') {
          if (columns.length === 0) {
            callback(new Error('Columns undefined!'));
            return;
          }
        }
        else if (typeof columns !== 'object') {
          callback(new Error('Wrong columns type!'));
          return;
        }
        if (typeof columns === 'string') {
          query += '(?);';
          params.push(columns);
        }
        else if (Array.isArray(columns)) {
          query += ' VALUES (';
          for (let key in columns) {
            query += '?,';
            params.push(columns[key]);
          }
          query = query.slice(0, -1);
          query += ');'
        }
        else {
          let values = ' VALUES (';
          query += ' (';
          for (let key in columns) {
            query += key + ',';
            values += '?,';
            params.push(columns[key]);
          }
          query = query.slice(0, -1);
          values = values.slice(0, -1);
          query += ')';
          values += ');';
          query += values;
        }
        break;
      case DELETE:
        query += 'DELETE FROM' + table;
        break;
      case UPDATE:
        query += 'UPDATE ' + table;
        if (typeof columns !== 'object') {
          callback(new Error('Columns should be Object!'));
          return;
        }
        query += ' SET ';
        for (let key in columns) {
          query += key + '=?,';
          params.push(columns[key]);
        }
        query = query.slice(0, -1);
        break;
      default:
        callback(new Error('Wrong method!'));
        break;
    }
    // 添加查询条件
    if (querySelector && (method === SELECT || method === DELETE || method === UPDATE)) {
      if (querySelector['where'] || querySelector['WHERE']) {
        query += ' WHERE ';
        let whereSelector = querySelector['where'] || querySelector['WHERE'];
        for (let key in whereSelector) {
          if (whereSelector[key] !== undefined && whereSelector[key].signal) {
            query += whereSelector[key].name + whereSelector[key].signal + '? && ';
            params.push(whereSelector[key].value);
          }
          else {
            query += key + '=? && ';
            params.push(whereSelector[key]);
          }
        }
				query = query.slice(0, -4);
      }
      if (querySelector['limit'] || querySelector['LIMIT']) {
        let limitSelector = querySelector['where'] || querySelector['WHERE'];
        if (limitSelector.start && limitSelector.end) {
          query += ' LIMIT ';
          query += limitSelector.start + ',' + (limitSelector.end - limitSelector.start);
        }
        query = query.slice(0, -4);
      }
    }
		query += ';';
    // 进行查询
    pool.query(query, params, callback);
  }
  catch (e) {
    callback(e);
  }
};
