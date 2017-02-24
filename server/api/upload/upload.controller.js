'use strict';

var multer = require('multer');
var xlsx = require('node-xlsx');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  }
}).single('file');

exports.upload = function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      res.json({error_code: 1, err_desc: err});
      return;
    }
    if (!req.file) {
      res.json({error_code: 1, err_desc: "No file passed"});
      return;
    }
    var workSheetsFromFile = xlsx.parse(req.file.path);
    console.log(workSheetsFromFile[0].data);
  });
};
