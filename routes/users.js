var express = require('express');
var router = express.Router();
var db = require('../models/index');
const { Op } = require("sequelize");
const { route } = require('.');
const req = require('express/lib/request');
const res = require('express/lib/response');

/* GET users listing. */
router.get('/', (req, res, next) => {
  const nm = req.query.name;
  db.User.findAll({}).then(usrs => {
    var data = {
      title: 'Users/Index',
      content: usrs
    }
    res.render('users/index', data);
  });
});

router.get('/add', (req, res, next) => {
  var data = {
    title: 'Users/Add',
    form: new db.User(),
    err: null
  }
  res.render('users/add', data);
});

router.post('/add', (req, res, next) => {
  const form = {
    name: req.body.name,
    pass: req.body.pass,
    mail: req.body.mail,
    age: req.body.age
  };
  db.sequelize.sync()
    .then(() => db.User.create(form)
    .then(usr => {
      res.redirect('/users')
    })
    .catch(err => {
      var data = {
        title: 'Users/Add',
        form: form,
        err: err
      }
      res.render('users/add', data)
    })
    )
});

router.get('/edit', (req, res, next) => {
  db.User.findByPk(req.query.id)
  .then(usr => {
    var data = {
      title: 'Users/Edit',
      form: usr
    }
    res.render('users/edit', data);
  });
});

router.post('/edit', (req, res, next) => {
  // db.sequelize.sync()
  // .then(() => db.User.update({
  //   name: req.body.name,
  //   pass: req.body.pass,
  //   mail: req.body.mail,
  //   age: req.body.age
  // },
  // {
  //   where:{id:req.body.id}
  // }))
  // .then(usr => {
  //   res.redirect('/users');
  // });
  db.User.findByPk(req.body.id)
  .then(usr => {
    usr.name = req.body.name;
    usr.pass = req.body.pass;
    usr.mail = req.body.mail;
    usr.age = req.body.age;
    usr.save().then(() => res.redirect('/users'));
  });
});

router.get('/delete', (req, res, next) => {
  db.User.findByPk(req.query.id)
  .then(usr => {
    var data = {
      title: 'Users/Delete',
      form: usr
    }
    res.render('users/delete',data);
  });
});

router.post('/delete', (req, res, next) => {
  db.sequelize.sync()
  .then(() => db.User.destroy({
    where:{id:req.body.id}
  }))
  .then(usr => {
    res.redirect('/users');
  });
})

module.exports = router;
