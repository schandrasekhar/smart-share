'use strict';

var config = require("../../config.js");
var Redis = require('RedisClass');
var cache = new Redis(config.cache.redis);
var sessionTimeout = config.sessionTimeout;
var protectedRoutes = config.protectedRoutes;

var AuthMiddleware = function(req, res, next) {
    var path = req.path,
        i = 0,
        length = protectedRoutes.length,
        method = req.method,
        isProtectedPath = false;
    for (; i < length; i++) {
        //TODO a better way to handle this
        if (protectedRoutes[i] === path) {
            isProtectedPath = true;
            if (method.toLowerCase() === "get") {
                authenticateGetReq(req, res, next);
            } else if (method.toLowerCase() === "post") {
                authenticatePostReq(req, res, next);
            } else {
                throwUnAuthException(res);
            }
        }
    }
    if (!isProtectedPath) {
        next();
    }
};

var authenticateGetReq = function(req, res, next) {
    var sessionKey = req.query ? req.query.id : null;
    authenticate(sessionKey, req, res, next);
};

var authenticatePostReq = function(req, res, next) {
    var sessionKey = req.body.id || null;
    authenticate(sessionKey, req, res, next);
};

var authenticate = function(sessionKey, req, res, next) {
    var cacheKey;
    if (sessionKey) {
        cacheKey = config.sessionCacheKeyPrefix + sessionKey;

        cache.get(cacheKey,
                function(err) {
                    cacheErr(err, response);
                },
                function(userHash) {
                    if (userHash) {
                        updateRequestObj(userHash, req, res, next);
                    } else {
                        throwUnAuthException(res);
                    }
                });
    } else {
        throwUnAuthException(res);
    }
}

var updateRequestObj = function(userHash, request, response, next) {
    var userSession = {
        "userHash": userHash
    };

    request.session = {
        "user": userSession
    }
    next();
};

var cacheErr = function(err, response) {
    console.log(err);
    response.status(500).end();
};

var throwUnAuthException = function(response) {
    response.status(403).end();
};

module.exports = AuthMiddleware;