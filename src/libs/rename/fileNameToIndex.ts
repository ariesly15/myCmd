const fs = require("fs");
const path = require("path");
const shelljs = require("shelljs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const { isFile } = require("../../utils");

module.exports = () => {
    const cwd = process.cwd();
    const prevCwd = path.join(cwd, "..");
    const files = fs.readdirSync(cwd);
    const questions = [];
    const pathReplace = str => str.replace(prevCwd, "");
    files.map((file, index) => {
        const srcFile = path.join(cwd, file);
        if (!isFile(srcFile)) return;
        const extname = path.extname(file);
        const basename = path.basename(file, extname);
        const distFile = srcFile.replace(
            `${basename}${extname}`,
            `index${extname}`
        );
        let srcMsg = pathReplace(srcFile);
        let distMsg = pathReplace(distFile);
        const srcMsgBase = path.basename(srcMsg);
        const distMsgBase = path.basename(distMsg);
        srcMsg = srcMsg.replace(srcMsgBase, chalk.yellow(srcMsgBase));
        distMsg = distMsg.replace(distMsgBase, chalk.green(distMsgBase));
        questions.push({
            type: "confirm",
            name: `Q${index}`,
            message: `${srcMsg} >>> ${distMsg}`,
            default: "Y",
            src: srcFile,
            dist: distFile
        });
    });
    inquirer.prompt(questions).then(answer => {
        Object.keys(answer).map(key => {
            if (answer[key]) {
                const { src, dist } = questions.filter(
                    item => item.name === key
                )[0];
                shelljs.mv(src, dist);
            }
        });
    });
};
