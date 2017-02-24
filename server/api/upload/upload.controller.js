'use strict';

var multer = require('multer');
var xlsx = require('node-xlsx');
function Team(req) {
  return req.app.get('models').Team;
}

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
    Team(req)
      .findOrCreate({where: {name: workSheetsFromFile[0].data[17][1]}})
      .then(function (team) {
        return res.status(200).json(team[0]);
      })
      .catch(function (err) {
        if (err) {
          console.log(err);
          return handleError(res, err);
        }
      });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
