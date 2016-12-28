'use strict';

var AuthMiddleware = function(req, res, next) {
    next();
};

module.exports = AuthMiddleware;