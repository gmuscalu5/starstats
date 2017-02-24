/**
 * Created by gabrielmuscalu on 24/02/17.
 */
'use strict';

var express = require('express');
var controller = require('./upload.controller');

var router = express.Router();

router.post('/', controller.upload);

module.exports = router;
