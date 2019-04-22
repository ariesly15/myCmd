const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const _ = require("lodash");
const chalk = require("chalk");
const { isDir } = require("../utils");

module.exports = options => {
    const prefix = options.prefix || "";
    const cwd = process.cwd();
    fs.readdirSync(cwd).map(item => {
        if (isDir(item)) {
            const newDir = prefix + _.upperFirst(item);
            const srcPath = path.join(cwd, item);
            const distPath = path.join(cwd, newDir);
            shell.mv(srcPath, distPath);
            // eslint-disable-next-line no-console
            console.log(`${chalk.cyan(item)} >>> ${chalk.green(newDir)}`);
        }
    });
};
