let express = require('express');
let router = express.Router();
let DBAction = require('../modules/DBAction');
let crypto = require('crypto');

// 请求注册码
router.post('/require_register_code', function(req, res, next) {
  res.send('1');
});

// 请求注册
router.post('/register', function(req, res, next) {
  let data = req.body;
  DBAction('select', 'users', 'id', {where:{phone: data.phone}}, (e, result) => {
    if (e) {
      console.error(e);
      res.statusCode = 400;
      res.send('3');
      return;
    }
    if (result.length) {
      res.send('2');
      return;
    }
    let columns = {
      phone: data.phone,
      name: data.name,
      password: crypto.createHash('md5').update(data.password.toString()).digest('hex'),
      favorite: '{"datya":"[]","next":0}',
      history_order: '{"data":"[]","next":0}'
    };
    DBAction('insert', 'users', columns, null, (e, result) => {
      if (e) {
        console.error(e);
        res.statusCode = 400;
        res.send('3');
        return;
      }
      if (result.affectedRows) {
        res.send('1');
      }
      else {
        res.statusCode = 403;
        res.send('3');
      }
    });
  });
});

// 请求登录
router.post('/login', function(req, res, next) {
  let data = req.body;
  let querySelector = {
    where:{
      phone: data.phone,
      password: crypto.createHash('md5').update(data.password.toString()).digest('hex')
    }
  };
  DBAction('select', 'users', 'id', querySelector, (e, result) => {
    if (e) {
      console.error(e);
      res.statusCode = 400;
      res.send('2');
      return;
    }
    if (result.length) {
      req.session.uid = result[0].id;
      res.send('1');
    }
    else {
      res.send('2');
    }
  });
});

// 请求修改
router.post('/change', function(req, res, next) {
  if (!req.session.uid) {
    res.send('2');
    return;
  }
  let id = req.session.uid;
  let data = req.body;
  let columns = {
    name: data.name,
    phone: data.phone,
    gender: data.gender,
    birthday: data.birthday
  };
  DBAction('update', 'users', columns, {where:{id: id}}, (e, result) => {
    if (e) {
      console.error(e);
      res.statusCode = 400;
      res.send('2');
      return;
    }
    if (result.affectedRows) {
      res.send('1');
    }
    else {
      res.send('2');
    }
  });
});

// 获取用户信息
router.get('/detail', function(req, res, next) {
  if (!req.session.uid) {
    res.send('2');
    return;
  }
  let id = req.session.uid;
  let columns = ['name', 'phone', 'gender', 'birthday'];
  DBAction('select', 'users', columns, {where:{id: id}}, (e, result) => {
    if (e) {
      console.error(e);
      res.statusCode = 500;
      res.send('3');
      return;
    }
    res.send(result[0]);
  });
});

// 获取收藏夹
router.get('/favorite', function(req, res, next) {
  if (!req.session.uid) {
    res.send('2');
    return;
  }
  let id = req.session.uid;
  let columns = 'favorite';
  DBAction('select', 'users', columns, {where:{id: id}}, (e, result) => {
    if (e) {
      console.error(e);
      res.statusCode = 400;
      res.send('3');
      return;
    }
    if (!result.length || result[0].favorite === null) {
      console.error(new Error('Failed to get favorite!'));
      res.statusCode = 400;
      res.send('3');
      return;
    }
    result = JSON.parse(result[0].favorite);
    result = JSON.parse(result.data);
    columns = ['id','title', 'feature', 'current_price', 'origin_price', 'picture_small'];
    let roomP = [];
    for (let i = 0; i < result.length; i++) {
      roomP.push(new Promise(function (resolve) {
        DBAction('select', 'rooms', columns, {where:{id: result[i]}}, (e, result) => {
          if (e) {
            throw e;
          }
          if (!result.length) {
            resolve(false);
          }
          resolve(result[0]);
        });
      }));
    }
    Promise.all(roomP).then(function (data) {
      if (!data.length) {
        res.send('[]');
        return;
      }
      let resData = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i]) {
          resData.push(data[i]);
        }
      }
      res.send(resData);
    })
      .catch(function (e) {
        console.error(e);
        res.statusCode = 403;
        res.send('3');
      });
  });
});
// 获取历史订单
router.get('/history', function(req, res, next) {
  if (!req.session.uid) {
    res.send('2');
    return;
  }
  let id = req.session.uid;
  let columns = 'history_order';
  DBAction('select', 'users', columns, {where:{id: id}}, (e, result) => {
    if (e) {
      console.error(e);
      res.statusCode = 400;
      res.send('3');
      return;
    }
    if (!result.length || result[0].history_order === null) {
      console.error(new Error('Failed to get history order!'));
      res.statusCode = 400;
      res.send('3');
      return;
    }
    result = JSON.parse(result[0].history_order);
    result = JSON.parse(result.data);
    columns = ['room_id', 'start_date', 'end_date', 'price'];
    let orderP = [];
    for (let i = 0; i < result.length; i++) {
      orderP.push(new Promise(function (resolve) {
        DBAction('select', 'orders', columns, {where:{id: result[i]}}, (e, result) => {
          if (e) {
            throw e;
          }
          if (!result.length) {
            resolve(false);
          }
          resolve(result[0]);
        });
      }));
    }
    Promise.all(orderP).then(function (data) {
      if (!data.length) {
        res.send('[]');
        return;
      }
      let newData = [];
      data.forEach((order) => {
        if (order) {
          newData.push(order);
        }
      });
      data = newData;
      let roomP = [];
      columns = ['title','picture_small'];
      for (let i = 0; i < data.length; i++) {
        roomP.push(new Promise(function (resolve) {
          DBAction('select', 'rooms', columns, {where:{id:data[i].room_id}}, (e, result) => {
            if (e) {
              throw e;
            }
            if (!result.length) {
              resolve(false);
            }
            resolve(result[0]);
          })
        }));
      }
      Promise.all(roomP).then(function (roomData) {
        if (!roomData.length) {
          res.send('[]');
          return;
        }
        let resData = [];
        roomData.forEach((room, i) => {
          if (room) {
            data[i].room_title = room.title;
            data[i].picture_small = room.picture_small;
            resData.push(data[i]);
          }
        });
        res.send(resData);
      })
        .catch(function (e) {
          console.error(e);
          res.statusCode = 403;
          res.send('3');
        });
    })
      .catch(function (e) {
        console.error(e);
        res.statusCode = 403;
        res.send('3');
      });
  });
});

module.exports = router;
