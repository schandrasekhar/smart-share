'use strict';

var config = {
    "cache": {
        "redis": {
            "host": 'localhost',
            "port": 6379
        }
    },

    "sessionKeyLength": 15,
    "sessionTimeout": 100000000,

    "paths": {
        "root": "/",
        "register": "/register",
        "login": "/login",
        "getAll": "/getAll",
        "upload": "/upload"
    },

    "user": {
        "collection": ""
    },

    "db": {
        "mongo": {
            "dbPath": "mongodb://localhost:27017,localhost:27018,localhost:27019/encryptedcloud?w=0&readPreference=secondary",
            "options": {
                "replicaSet": {
                    "rs_name": "rs0"
                }
            }
        }
    }
};

config.protectedRoutes = [config.paths.upload, config.paths.getAll];

module.exports = config;