var express = require('express');
var router = express.Router();
var tempController = require('../controllers/temp.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  tempController(req, res, next);
  return;
  //res.render('index', { title: 'Express' });
});

module.exports = router;
