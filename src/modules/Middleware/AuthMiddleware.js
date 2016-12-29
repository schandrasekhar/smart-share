'use strict';

var config = require("../../config.js");
var Redis = require('RedisClass');
var cache = new Redis(config.cache.redis);
var sessionTimeout = config.sessionTimeout;
var protectedRoutes = config.protectedRoutes;

var AuthMiddleware = function(req, res, next) {
    //TODO
};

module.exports = AuthMiddleware;