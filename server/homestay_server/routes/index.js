let express = require('express');
let getSumDay = require('../modules/getSumDay');
let router = express.Router();
let DBAction = require('../modules/DBAction');
let {isOccupied, addOccupied} = require('../modules/occupiedAction');
let {getMysqlDateTime} = require('../modules/getMysqlDate');
let fs = require('fs');

// 首页
router.post('/', function(req, res, next) {
  let flag = true;
  let prom = new Promise(function (resolve, reject) {
      resolve('resolve');
      reject();
  });
  prom.then(function (data) {
    console.log(data);
  }, function () {
    console.log('err')
  });
  res.send('1');
});
// 搜索
router.get('/search', function(req, res, next) {
  let query = req.query;
  // 数据库存储日期格式：结束日期减1，只住一天则结束日期等于起始日期
  let startDay = getSumDay(query['start_date']);
  let endDay = getSumDay(query['end_date']) - 1;
  let columns = ['id','title','feature','activity','current_price','origin_price','star','picture_small','occupied'];
  let querySelector = {};
  if (query.district) {
    if(!querySelector.where) {
      querySelector.where = {};
    }
    querySelector.where.district = query.district;
  }
  if (query.sight) {
    if(!querySelector.where) {
      querySelector.where = {};
    }
    querySelector.where.sight = query.sight;
  }
  DBAction('select', 'rooms', columns, querySelector.where ? querySelector : null, (e, result) => {
    if (e) {
      console.error(e);
      res.statusCode = 404;
      res.send('2');
      return;
    }
    let list = [];
    for (let i = 0; i < result.length; i++) {
      let occupied = JSON.parse(result[i].occupied);
      if (!isOccupied(occupied, startDay, endDay)) {
        list.push(result[i]);
      }
    }
    res.send(list);
  });
});

// 详情
router.get('/detail', function(req, res, next) {
  let roomId = req.query.id;
  if (!roomId) {
    res.statusCode = 400;
    res.send('2');
    return;
  }
  let uid = req.session.uid ? req.session.uid : null;
  let columns = [
    'id',
    'title',
    'equipment',
    'feature',
    'current_price',
    'origin_price',
    'activity',
    'star',
    'max_people',
    'describe_detail',
    'review',
    'district',
    'sight',
    'picture_small',
    'picture_big'
  ];
  // baseResult为房间信息
  let querySelector = {where:{id: roomId}};
  let review = [];
  let roomP = new Promise(function (resolve) {
    resolve();
  });
  roomP.then(function() {
    // 首先查找房间信息
    DBAction('select', 'rooms', columns, querySelector, (e, result) => {
      if (e) {
        throw e;
      }
      if (!result) {
        res.statusCode = 403;
        res.send('2');
        return;
      }
      let baseResult = result = result[0];
      review = JSON.parse(result.review);
      review = JSON.parse(review.data);
      if (!Array.isArray(review)) {
        review = [review];
      }
      let reviewP = [];
      // 继续查找房间评论
      for (let i = 0; i < review.length; i++) {
        reviewP.push(new Promise(function (resolve) {
          let columns = ['id', 'uid', 'room_id', 'order_id', 'review_time', 'content', 'star'];
          DBAction('select', 'reviews', columns, {where: {id: review[i]}}, (e, result) => {
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
      Promise.all(reviewP).then(function (data) {
        // 查找用户是否已经购买过
        if (!uid) {
          baseResult.review = data;
          baseResult.isOrdered = false;
          res.send(baseResult);
          return;
        }
        let resData = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i]) {
            resData.push(data[i]);
          }
        }
        data = resData;
        DBAction('select', 'users', 'history_order', {where: {id: uid}}, (e, result) => {
          if (e) {
            throw e;
          }
          if (!result.length) {
            console.error(e);
            res.statusCode = 500;
            res.send('2');
            return;
          }
          result = JSON.parse(result[0]['history_order']);
          let orderList = JSON.parse(result.data);
          let orderedP = [];
          for (let i = 0; i < orderList.length; i++) {
            orderedP.push(new Promise(function (resolve) {
              DBAction('select', 'orders', 'room_id', {where: {id: orderList[i]}}, (e, result) => {
                if (e) {
                  throw e;
                }
                if (result.length) {
                  resolve(parseInt(result[0].room_id) === parseInt(roomId));
                }
                else {
                  resolve(false);
                }
              });
            }));
          }
          Promise.all(orderedP).then(function (isOrdered) {
            isOrdered = isOrdered.reduce((a,b) => {return a || b});
            baseResult.review = data;
            baseResult.isOrdered = isOrdered;
            res.send(baseResult);
          }).catch(function (e) {
            throw e;
          })
        });
      })
        .catch(function (e) {
          console.error(e);
          res.statusCode = 500;
          res.send('2');
        });
    })
  });
});

// 发送评论
router.post('/review', function(req, res, next) {
  let data = req.body;
  if (!req.session.uid) {
    res.statusCode = 403;
    res.send('2');
    return;
  }
  let uid = req.session.uid;
  let roomId = parseInt(data['room_id']);
  let reviewTime = getMysqlDateTime();
  let content = data.content;
  let star = data.star;
  let orderList = [];
  let userP = new Promise(function (resolve) {
    resolve();
  });
  userP.then(function () {
    // 查找用户是否已经购买过
    DBAction('select', 'users', 'history_order', {where: {id: uid}}, (e, result) => {
      if (e) {
        res.statusCode = 404;
        res.send('4');
        console.error(e);
        return;
      }
      result = JSON.parse(result[0].history_order);
      orderList = JSON.parse(result.data);
      if (!Array.isArray(orderList)) {
        orderList = [orderList];
      }
      let orderP = [];
      for (let i = orderList.length - 1; i >= 0; i--) {
        orderP.push(new Promise(resolve => {
          DBAction('select', 'orders', ['id','room_id'], {where: {id: orderList[i]}}, (e, result) => {
            if (e) {
              throw e;
            }
            if (result.length) {
              if (parseInt(result[0]['room_id']) === parseInt(roomId)) {
                resolve({orderId: result[0].id, historyOrder: orderList});
              }
              else {
                resolve(false);
              }
            }
            else {
              resolve(false);
            }
          });
        }));
      }
      Promise.all(orderP).then(function (data) {
        let bought = false;
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i]) {
            bought = true;
            let columns = {
              uid: uid,
              room_id: roomId,
              order_id: data[i].orderId,
              review_time: reviewTime,
              content: content,
              star: star
            };
            let orderId = data[i].orderId;
            // 保存评论
            DBAction('insert', 'reviews', columns, null, (e, result) => {
              if (e) {
                throw e;
              }
              if (!result.affectedRows) {
                console.error(new Error('Failed to save reviews!'));
                res.statusCode = 400;
                res.send('4');
                return;
              }
              // 获得新评论的id
              DBAction('select', 'reviews', 'id', {where:{order_id: orderId}}, (e, result) => {
                if (e) {
                  throw e;
                }
                if (result.length) {
                  let reviewId = result[result.length - 1].id;
                  // 获取房间历史评论
                  DBAction('select', 'rooms', 'review', {where:{id: roomId}}, (e, result) => {
                    if (e) {
                      throw e;
                    }
                    if (result.length) {
                      let review = JSON.parse(result[0].review);
                      review = JSON.parse(review.data);
                      review.push(reviewId);
                      let param = {
                        data: JSON.stringify(review),
                        next: 0
                      };
                      let columns = {
                        review: JSON.stringify(param)
                      };
                      DBAction('update', 'rooms', columns, {where:{id:roomId}}, (e,result) => {
                        if (e) {
                          throw e;
                        }
                        if (result.affectedRows) {
                          res.send('1');
                        }
                        else {
                          console.error(new Error('Failed to save new reviews into rooms!'));
                          res.statusCode = 400;
                          res.send('4');
                          return;
                        }
                      })
                    }
                    else {
                      console.error(new Error('Failed to select reviews from rooms!'));
                      res.statusCode = 400;
                      res.send('4');
                      return;
                    }
                  })
                }
                else {
                  console.error(new Error('Failed to get new reviews!'));
                  res.statusCode = 400;
                  res.send('4');
                  return;
                }
              });

            });
            // 及时退出，否则当用户发送多条评论时会产生bug
            break;
          }
        }
        if (!bought) {
          res.send("3");
        }
      })
        .catch(function (e) {
          console.error(e);
          res.statusCode = 404;
          res.send('4');
        })
    });
  });
});

// 添加收藏夹
router.post('/add_favorite', function (req, res, next) {
  let roomId = parseInt(req.body.room_id);
  if (!roomId) {
    res.send('3');
    return;
  }
  if (!req.session.uid) {
    res.send('2');
    return;
  }
  let uid = req.session.uid;
  DBAction('select', 'users', 'favorite', {where:{id: uid}}, (e, result) => {
    if (e) {
      console.error(e);
      res.statusCode = 400;
      res.send('3');
      return;
    }
    if (!result.length) {
      console.error(new Error('Failed to get favorite!'));
      res.statusCode = 400;
      res.send('3');
      return;
    }
    let data = JSON.parse(result[0].favorite);
    data = JSON.parse(data.data);
    // 点击添加或删除
    if (data.indexOf(roomId) === -1) {
      data.push(roomId);
    }
    else {
      data.splice(data.indexOf(roomId), 1);
    }
    data = {
      data: JSON.stringify(data),
      next: 0
    };
    let columns = {
      favorite: JSON.stringify(data),
    };
    // 将收藏内容添加进用户记录中
    DBAction('update', 'users', columns, {where:{id: uid}}, (e, result) => {
      if (e) {
        throw e;
      }
      if (result.affectedRows) {
        res.send('1');
      }
      else {
        console.error(new Error('Failed to save new favorite into users!'));
        res.statusCode = 400;
        res.send('3');
        return;
      }
    })
  });
});

// 下单
router.post('/order', function(req, res, next) {
  if (!req.session.uid) {
    res.statusCode = 403;
    res.send('2');
    return;
  }
  let uid = req.session.uid;
  let roomId = req.body['room_id'];
  let startDate = req.body['start_date'];
  let endDate = req.body['end_date'];
  // 获取房间当前价格
  let orderP = new Promise(function (resolve) {
    resolve();
  });
  orderP.then(function () {
    DBAction('select', 'rooms', 'current_price', {where: {id: roomId}}, (e, result) => {
      if (e) {
        res.statusCode = 500;
        res.send('3');
        throw e;
      }
      if (!result.length) {
        res.statusCode = 403;
        res.send('3');
        console.error(new Error('Failed to get room while setting order!'));
        return;
      }
      // 将订单插入数据库
      let data = result[0];
      let columns = {
        uid: uid,
        room_id: roomId,
        price: data.current_price,
        start_date: startDate,
        end_date: endDate,
        status: 0,
        set_time: getMysqlDateTime()
      };
      DBAction('insert', 'orders', columns, null, (e, result) => {
        if (e) {
          res.statusCode = 500;
          res.send('3');
          throw e;
        }
        if (!result.affectedRows) {
          res.statusCode = 403;
          res.send('3');
          console.error(new Error('Failed to save new order!'));
          return;
        }
        // 获取新订单的id
        DBAction('select', 'orders', 'id', {where:{uid: uid}}, (e, result) => {
          if (e) {
            res.statusCode = 500;
            res.send('3');
            throw e;
          }
          if (!result.length) {
            res.statusCode = 403;
            res.send('3');
            console.error(new Error('Failed to get new order id!'));
            return;
          }
          // 将订单id插入用户列表的历史订单
          let orderId = result[result.length - 1].id;
          data = [];
          for (let i = 0; i < result.length; i++) {
            data.push(result[i].id);
          }
          data = {
            data: JSON.stringify(data),
            next: '0'
          };
          data = JSON.stringify(data);
          let columns = {
            history_order: data
          };
          DBAction('update', 'users', columns, {where:{id: uid}}, (e, result) => {
            if (e) {
              res.statusCode = 500;
              res.send('3');
              throw e;
            }
            if (!result.affectedRows) {
              res.statusCode = 403;
              res.send('3');
              console.error(new Error('Failed to insert new order id into users!'));
              return;
            }
            res.send(JSON.stringify({order_id: orderId}));
          });
        });
      });
    });
  })
    .catch(function (e) {
      console.error(e);
    })
});

// 支付
router.post('/pay', function(req, res, next) {
  if (!req.session.uid) {
    res.statusCode = 403;
    res.send('2');
    return;
  }
  let uid = req.session.uid;
  let orderId = req.body.order_id;
  let columns = {
    status: 1,
    pay_time: getMysqlDateTime()
  };
  DBAction('update', 'orders', columns, {where:{id: orderId}}, (e, result) => {
    if (e) {
      res.statusCode = 500;
      res.send('3');
      console.error(e);
      return;
    }
    if (!result.affectedRows) {
      res.statusCode = 403;
      res.send('3');
      console.error(new Error('Wrong order id!'));
      return;
    }
    res.send('1');
  });
});

module.exports = router;
