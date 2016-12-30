'use strict';

var StaticMiddleware = function(req, res, next) {
    var path = req.path,
        staticFilesPathPrefix = "/build/",
        absoluteRelPath = __dirname + "/../../../public",
        staticFilePath,
        fileName;
    if (path.indexOf(staticFilesPathPrefix) === 0) {
        staticFilePath = absoluteRelPath + staticFilesPathPrefix;
        fileName = getFileName(path);
        res.sendFile(fileName, {root: staticFilePath});
    } else {
        next();
    }
};

var getFileName = function(path) {
    var arr = path.split("/");
    return arr[arr.length - 2] + "/" + arr[arr.length - 1];
};

module.exports = StaticMiddleware;