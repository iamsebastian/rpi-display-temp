var readTempLib = require('../../lib/read_temp.js');

module.exports = function tempController (req, res, next) {
  readTempLib()
  .then(function (temp) {
    temp = temp/1000;
    res.status(200).render('temp_as_html', {temp: temp});
  });
};
