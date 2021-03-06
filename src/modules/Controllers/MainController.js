'use strict';

var config = require("../../config.js");
var Redis = require('RedisClass');
var cache = new Redis(config.cache.redis);
var MongoClass = require('MongoClass');
var mongo = new MongoClass(config.db.mongo);

var MainController = function() {

    var userCollection = config.user.collection.data;

    var contructor = function() {
        //
    };

    this.index = function(req, res) {
        var absolutePath = __dirname + "/../../../public/build/html";
        res.sendFile("index.html", {root: absolutePath});
    };

    this.getAll = function(req, res) {
        var user = req.session.user;
        if (user) {
            mongo.find(userCollection, user,
                function(err) {
                    dbErr(err, res);
                },
                function(doc) {
                    if (doc.length === 1) {
                        sendData(doc, req, res);
                    } else {
                        console.log("Error: Multiple records found");
                        res.status(500).end();
                    }
                });
        } else {
            console.log("Error: No user found");
            res.status(403).end();
        }
    };

    this.upload = function(req, res) {
        var timestamp, data, requestData, user, updateObj = {};
        user = req.session.user;
        requestData = req.body.data;

        if (requestData && user) {
            timestamp = (new Date()).getTime();
            updateObj["data." + timestamp] = requestData;
            mongo.updateOne(userCollection, user, updateObj,
                function(err) {
                    dbErr(err, res);
                },
                function(result) {
                    sendSuccess(req, res);
                });
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

    var sendData = function(doc, request, response) {
        doc = doc[0].data;
        var jsonData = {
            "status": true,
            "data": doc
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