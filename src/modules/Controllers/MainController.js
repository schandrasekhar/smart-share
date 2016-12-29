'use strict';

var config = require("../../config.js");
var Redis = require('RedisClass');
var cache = new Redis(config.cache.redis);
var MongoClass = require('MongoClass');
var mongo = new MongoClass(config.db.mongo);

var MainController = function() {

    var userCollection = config.user.collection;

    var contructor = function() {
        //
    };

    this.index = function(req, res) {
        var absolutePath = __dirname + "../../../public/";
        res.sendFile("index.html", {root: absolutePath});
    };

    this.getAll = function(req, res) {
        var user = req.session.user;
        if (user) {
            mongo.find(userCollection, user,
                function(err) {
                    dbErr(err, res);
                },
                function(data) {
                    sendData(data, req, res);
                });
        } else {
            console.log("Error: No user found");
            res.status(403).end();
        }
    };

    this.upload = function(req, res) {
        var timestamp, data, requestData, user;
        user = req.session.user;
        requestData = req.body.data;

        if (requestData && user) {
            timestamp = (new Date()).getTime();
            data = {
                timestamp: requestData
            };
            mongo.updateOne(userCollection, user, data,
                function(err) {
                    dbErr(err, res);
                },
                sendSuccess(req, res));
        }
    };

    var redirect = function(req, res, path) {
        if (path && res) {
            res.redirect(path);
        }
    };

    var sendSuccess = function(request, response) {
        response.send({"status": true});
    };

    var sendData = function(data, request, response) {
        var jsonData = {
            "status": true,
            "data": data
        };
        response.send(jsonData);
    };

    var cacheErr = function(err, response) {
        console.log(err);
        response.status(500).end();
    };

    var dbErr = function(err, response) {
        console.log(err);
        response.status(500).end();
    };

    contructor();
};

module.exports = new MainController();