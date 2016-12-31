'use strict';

var config = {
    "cache": {
        "redis": {
            "sentinels": [
            {
                "host": 'localhost',
                "port": 16380
            },
            {
                "host": 'localhost',
                "port": 16381
            },
            {
                "host": 'localhost',
                "port": 16382
            }
        ],
            "name": 'redis-cluster'
        }
    },

    "sessionCacheKeyPrefix": "smartshare-session-",
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
        "collection": {
            "auth": "authy",
            "data": "data"
        },
        "userHashLength": 10
    },

    "db": {
        "mongo": {
            "dbPath": "mongodb://localhost:27017,localhost:27018,localhost:27019/smartshare?w=0&readPreference=secondary",
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