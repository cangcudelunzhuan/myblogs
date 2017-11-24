const express = require('express')
const router = express.Router()
const db = require('./db')
const util = require("util")
const multer  = require('multer')
// const check = require('./check')
// const checkLogin = check.checkLogin
// const checkNotLogin = check.checkNotLogin
//
// 
// 注册
router.post('/admin/signup', function (req, res) {
    console.log("~~~"+JSON.stringify(req.body))
    db.User.findOne({ name: req.body.name }, function (err, docs) {
      if(docs){
        res.send({status: 1,mes:"用户已存在"})
      }else{
        new db.User(req.body).save(function (err) {
          if (err) {
            res.append('Content-Type', 'text/plain')
            res.status(500).send()
            return
          }
          res.send({status: 0,mes:"注册成功"})
        })
      }
    })
    
}) 
// 登录
router.post('/admin/signin', function (req, res) {
  // req.session.user = req.body.userInfo
    db.User.findOne({ name: req.body.username }, function (err, docs) {
      if (err) {
        res.status(500).send()
        return
      }
      if(docs.password==req.body.password){
        res.send({status: 0,mes: '登录成功',obj:docs})
      }else{
        res.send({status:1,mes:"密码错误"})
      }
      
    })
})
// 根据用户名获取用户
router.get('/admin/getUser/:name', function (req, res) {
  db.User.findOne({ name: req.params.name }, function (err, docs) {
    // console.log('')
    if (err) {
      console.error(err)
      res.send({status: 'fail'})
      return
    }
    res.append('Content-Type', 'text/plain')
    if(!docs){
      res.send({status: 'fail'})
    }else{
      res.send(docs)
    }

    // if (!docs) {
    //   res.append('Content-Type', 'text/plain')
    //   res.status(405).send({status: 'fail'})
    // } else {
    //   res.append('Content-Type', 'text/plain')
    //   res.status(200).send(docs)
    //   // res.send(docs)
    // }
    // {"_id":"59f0066d50866d4f28e957e1","name":"cangcudelunzhuan","password":"123456","__v":0}
  })
})

//发布文章
router.post('/save', function (req, res) {  
    new db.Article(req.body).save(function (err) {
      if (err) {
        res.append('Content-Type', 'text/plain')
        res.status(500).send()
        return
      }
      res.send({status: 0,mes:"发布成功"})
    })
    
}) 

//添加标签
router.post('/uptags', function (req, res) {  
    var info=req.body
    var labels=info.labels
    labels.forEach( function(item, index) {
      db.Tag.findOne({"content": item}, function (err, docs) {
          if (err) {
            console.log("err:"+err)
            return
          }
          if(!docs){
            var tagbody={"content":item}
            new db.Tag(tagbody).save(function (err) {
              if (err) {
                res.status(500).send()
                return
              }  
            })
          }
          // else{
          //   db.Tag.update({content: item},
          //     {"$push":{"artlist":{title:info.title,date:info.date}}},function(err){
          //     if (err) {
          //       res.status(500).send()
          //       return
          //     }
          //   })
          // }
      })

    }) 
}) 

//获取所有标签
router.get('/gettags', function (req, res) {
  db.Tag.find({}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})

//获取标签内容
router.get('/getTaginfo', function (req, res) {
  db.Article.find({ labels:req.query.content}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    if(docs){
      res.send({status:0,mes:"找到了",obj:docs})
    }else{
      res.send({status:1,mes:"没有数据"})
    }
    
  })
})




// 获取所有文章
// router.get('/articleList', function (req, res) {

//   db.Article.find({}, function (err, docs) {
//     if (err) {
//       console.error(err)
//       return
//     }
//     res.send(docs)
//   }).sort({"date":-1})
// })
router.get('/articleList', function (req, res, next) {
    var limit = 5;
    var currentPage = req.query.page;

    if (currentPage < 1) {
        currentPage = 1;
    }

    db.Article.find({}).exec(function (err, rs) {
        if (err) {
            res.send(err);
        } else {
            var totalPage = Math.floor(rs.length / limit);
            if (rs.length % limit != 0) {
                totalPage += 1;
            }

            if (currentPage > totalPage) {
                currentPage = totalPage;
            }
            console.log(currentPage);
            var query = db.Article.find({}).sort({"date":-1});
            query.skip((currentPage - 1) * limit);
            query.limit(limit);
            query.exec(function (err, result) {
                jsonArray = {totalCount: rs.length, data: result};
                // res.json(jsonArray);
                res.send(jsonArray)
            })
        }
    })
})


//获取文章详情aerDetail
router.get('/aerDetail',function (req, res) {
  db.Article.findOne({ _id:req.query._id}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    if(docs.auther==req.query.auther){
      res.send({status: 0,obj:docs})
    }else{
      res.send({status: 1,obj:docs})
    }
    
  })
})
//获取上一篇
router.get('/getpre', function (req, res, next) {
    db.Article.find({_id: {$gt: req.query._id}},function (err, docs) {
      if (err) {
        console.error(err)
        return
      }
      res.send(docs)
    }).limit(1).sort({_id:1})
    
})
//获取下一篇
router.get('/getnext', function (req, res, next) {
    db.Article.find({_id: {$lt: req.query._id}},function (err, docs) {
      if (err) {
        console.error(err)
        return
      }
      res.send(docs)
    }).limit(1).sort({_id:-1})
    
})

//删除文章
router.post('/godelete', function (req, res) {  
    db.Article.remove({ _id:req.body._id}, function (err) {
      if (err) {
        console.error(err)
        res.status(500).send()
        return
      }
      res.send({status: 0,mes:"删除成功"})
    })
    
}) 
// db.Tag.remove({ }, function (err) {
//   if (err) {
//     console.error(err)
//     return
//   }
// })

//更新文章
router.post('/updateArt', function (req, res) {  
  let info = req.body
  db.Article.find({_id:info._id}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    docs[0].title = info.title
    docs[0].date = info.date
    docs[0].content = info.content
    docs[0].gist = info.gist
    docs[0].labels = info.labels
    docs[0].auther = info.auther
    db.Article(docs[0]).save(function (err) {
      if (err) {
        res.status(500).send()
        return
      }
      res.send({status: 0,mes:"更新成功"})
    })
  })
}) 
//修改密码
router.post('/updatePassword', function (req, res) {  
  let info = req.body
  db.User.find({name:info.name}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    if(docs[0].password==info.oldpassword){
        docs[0].password = info.password
        db.User(docs[0]).save(function (err) {
          if (err) {
            res.status(500).send()
            return
          }
          res.send({status: 0,mes:"修改成功"})
        })
    }else{
        res.send({status: 1,mes:"密码不正确"})
    }
  })
}) 

//上传图片
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "static/uploads/img");
    },
    filename: function (req, file, callback) {
        let ext = file.originalname.split(".")[1]
        callback(null, file.fieldname + '_' + Date.now() + "." + ext);
    }
});

const upload = multer({ storage: Storage })
router.post('/static/img', upload.single('image'), function (req, res) {
  res.send({url: "/" + req.file.path})
})

//搜索
router.get('/search', function (req, res, next) {

  var info=req.query
  db.Article.ensureIndexes({"title":1})

  db.Article.prototype.getIndexes = function() {
    throw new Error('Collection#getIndexes unimplemented by driver');
  }

  var limit = 5;
  var currentPage = info.page;

  if (currentPage < 1) {
      currentPage = 1;
  }

  db.Article.find({"title":new RegExp(info.key) }).exec(function (err, rs) {
      if (err) {
          res.send(err);
      } else {
          var totalPage = Math.floor(rs.length / limit);
          if (rs.length % limit != 0) {
              totalPage += 1;
          }

          if (currentPage > totalPage) {
              currentPage = totalPage;
          }
          console.log(currentPage);
          var query = db.Article.find({"title":new RegExp(info.key) }).sort({"date":-1});
          query.skip((currentPage - 1) * limit);
          query.limit(limit);
          query.exec(function (err, result) {
              jsonArray = {totalCount: rs.length, data: result};
              // res.json(jsonArray);
              res.send(jsonArray)
          })
      }
  })


  // db.Article.find({"title":new RegExp(info.key) }, function (err, docs) {
  //   if (err) {
  //     console.error(err)
  //     return
  //   }
  //   res.send(docs)
  // })
})



module.exports = router