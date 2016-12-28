'use strict';

var config = require("../../config.js");
var Redis = require('RedisClass');
var cache = new Redis(config.cache.redis);

var MainController = function() {
    var userKey, cacheKey;

    var contructor = function() {
        setUserKey();
    };

    var setUserKey = function() {
        userKey = config.userKey;
        cacheKey = "smart-share-" + userKey;
    };

    this.get = function(req, res) {
        cache.hashGetAll(cacheKey,
                function(err) {
                    cacheErr(err, res);
                },
                sendData(data, req, res));
    };

    this.add = function(req, res) {
        var timestamp, data, requestData;
        requestData = req.body.data;
        if (requestData) {
            timestamp = (new Date()).getTime();
            data = {
                timestamp: requestData
            };

            cache.hashInsert(cacheKey, data,
                    function(err) {
                        cacheErr(err, res);
                    },
                    redirect(req, res, config.paths.get));
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
            "data": data
        };

        //TODO send file

        response.send(jsonData);
    };

    var cacheErr = function(err, response) {
        console.log(err);
        response.status(500).end();
    };

    contructor();
};

module.exports = new MainController();