var readTempLib = require('../../lib/read_temp.js');

module.exports = function tempController (req, res, next) {
  readTempLib()
  .then(function (temp) {
    res.status(200).json({temp: temp});
  });
};
