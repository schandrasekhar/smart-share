'use strict';

var config = require("../../config.js");
var crypto = require('crypto');
var MongoClass = require('MongoClass');
var mongo = new MongoClass(config.db.mongo);
var Redis = require('RedisClass');
var cache = new Redis(config.cache.redis);
var UtilClass = require('UtilClass');
var utils = new UtilClass();

var AuthController = function() {

    var authCollection = config.user.collection.auth;
    var userCollection = config.user.collection.data;

    this.login = function(req, res) {
        var username, pass, cred;
        if (req.body) {
            if (!req.body.key) {
                username = parseData(req.body.username);
                pass = createHash(parseData(req.body.pass));
                cred = {
                    "username": username,
                    "key": pass
                };
                getUserMetaFromDb(cred, res);
            } else {
                req.status(500).end();
            }
        }
    };

    this.register = function(req, res) {
        var username = parseData(req.body.username),
            pass = createHash(parseData(req.body.pass)),
            cred = {};
        cred = {
            "username": username,
            "key": pass
        };

        checkInDb(cred, req, res, addUserInDb);
    };

    var authenticateUser = function(userCount, credentials, request, response) {
        if (userCount === 1) {
            loginUserSuccess(credentials, response);
        } else {
            response.send(500).end();
        }
    };

    var getUserMetaFromDb = function(credentials, response) {
        mongo.find(authCollection, credentials,
                function(err) {
                    dbErr(err, response);
                },
                function(doc) {
                    if (doc && (doc.length === 1)) {
                        setUserSession(doc[0], response, sendSessionKey);
                    } else {
                        response.send(403).end();
                    }
                });
    };

    var checkInDb = function(credentials, request, response, successFunc) {
        mongo.exists(authCollection, credentials,
            function(err) {
                dbErr(err, response);
            },
            function(result) {
                if (result > 1) {
                    multiUserExistsErr(credentials.username, response);
                } else {
                    successFunc(result, credentials, request, response);
                }
            });
    };

    var addUserInDb = function(userCount, credentials, request, response) {
        credentials.userHash = utils.getRandomHash(config.user.userHashLength);
        mongo.insertOne(authCollection, credentials, null, 
                function(err) {
                    dbErr(err, response);
                },
                function(result) {
                    addUserMetaInDb(credentials, response);
                });
    };

    var addUserMetaInDb = function(credentials, response) {
        var data = {
            "userHash": credentials.userHash,
            "data": {}
        };
        mongo.insertOne(userCollection, data, null,
                function(err) {
                    dbErr(err, response);
                },
                function(result) {
                    addUserSuccess(credentials ,response);
                });
    };

    var addUserSuccess = function(credentials, response) {
        setUserSession(credentials, response, sendSessionKey);
    };

    var setUserSession = function(credentials, response, successFunc) {
        var userSessionIdentifier = utils.getRandomHash(config.sessionKeyLength),
            sessionKey = config.sessionCacheKeyPrefix + userSessionIdentifier;
        //create two objects in cache, one which has user meta data,
        //the other to hold sessionKey and userHash
        cache.set(sessionKey, credentials.userHash, 
            function(err) {
                cacheErr(err, response);
            },
            function(result) {
                updateUserMetaInCache(userSessionIdentifier, credentials.userHash, response, successFunc);
            });
    };

    var updateUserMetaInCache = function(userSessionIdentifier, userHash, response, successFunc) {
        var session = {
                "dateCreated": (new Date()).getTime(),
                "dateUpdated": (new Date()).getTime()
            };
        cache.hashInsert(userHash, session,
                function(err) {
                    cacheErr(err, response);
                },
                function(result) {
                    successFunc(userSessionIdentifier, response);
                });
    };

    var sendSessionKey = function(sessionKey, response) {
        response.send({
            "status": true,
            "sessionKey": sessionKey
        });
    };

    var createHash = function(key) {
        return crypto.createHash('md5').update(key).digest('hex');
    };

    var dbErr = function(err, response) {
        console.log(err);
        response.status(500).end();
    };

    var cacheErr = function(err, response) {
        console.log(err);
        response.status(500).end();
    };

    var multiUserExistsErr = function(username, response) {
        console.log("Multiple user exits for username ==> " + username);
        response.status(500).end();
    };

    var parseData = function(value) {
        return value;
    };
};

module.exports = new AuthController();