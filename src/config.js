'use strict';

var config = {
    "cache": {
        "redis": {
            "host": 'localhost',
            "port": 6379
        }
    },

    "userKey": "12345",

    "paths": {
        "get": "/",
        "add": "/upload"
    }
};

module.exports = config;