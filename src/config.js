'use strict';

var config = {
    "cache": {
        "redis": {
            "host": 'localhost',
            "port": 6379
        }
    },

    "sessionKeyLength": 15,

    "paths": {
        "root": "/",
        "upload": "/upload",
        "login": "/login",
        "register": "/register",
        "getAll": "/getAll"
    },

    "protectedRoutes": ["/upload", "/getAll"],

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

module.exports = config;