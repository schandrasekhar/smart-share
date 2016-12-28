'use strict';

var config = require("./config.js");
var router = require('express')();
var mainController = require("./modules/Controllers/MainController.js");
var authMiddleware = require("./modules/Middleware/AuthMiddleware.js");
var bodyParser = require("body-parser");
var port = process.argv[2] ? process.argv[2] : 8009;

//middleware defined below
router.use(authMiddleware);
router.use(bodyParser);


//routers are defined below

//get a list of smart-share data
router.get(config.paths.get, function(req, res) {
    mainController.get(req, res);
});

//add a smart-share piece of data
router.post(config.paths.add, function(req, res) {
    mainController.add(req, res);
});

router.listen(port, function() {
  console.log("Running on port " + port);
});