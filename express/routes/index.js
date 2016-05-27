var express = require('express');
var router = express.Router();
var tempController = require('../controllers/temp.js');
var tempToHtmlController = require('../controllers/temp_to_html.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  tempController(req, res, next);
  return;
  //res.render('index', { title: 'Express' });
});

/* GET temp displayed as html. */
router.get('/html/', function(req, res, next) {
  tempToHtmlController(req, res, next);
  return;
});

module.exports = router;
