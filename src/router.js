'use strict';

var config = require("./config.js");
var express = require("express");
var router = express();
var mainController = require("./modules/Controllers/MainController.js");
var authController = require("./modules/Controllers/AuthController.js");
var authMiddleware = require("./modules/Middleware/AuthMiddleware.js");
var bodyParser = require("body-parser");
var staticMiddleware = require("./modules/Middleware/StaticMiddleware");
var port = process.argv[2] ? process.argv[2] : null;

if (port) {

    //middleware defined below
    router.use(staticMiddleware);
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());
    router.use(authMiddleware);

    //routes are defined below
    router.get("/", function(req, res) {
        mainController.index(req, res);
    });

    router.post(config.paths.login, function(req, res) {
        authController.login(req, res);
    });

    router.post(config.paths.register, function(req, res) {
        authController.register(req, res);
    });

    router.get(config.paths.getAll, function(req, res) {
        mainController.getAll(req, res);
    });

    router.post(config.paths.upload, function(req, res) {
        mainController.upload(req, res);
    });

    router.listen(port, function() {
        console.log("Running on port " + port);
    });
} else {
    console.log("Error: Please specify port for the server to run on!!");
}

