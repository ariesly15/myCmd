const fs = require("fs");

exports.isFile = filePath =>
    fs.existsSync(filePath) && fs.statSync(filePath).isFile();
exports.isDir = filePath =>
    fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();
