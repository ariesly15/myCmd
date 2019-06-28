const path = require("path");
const shell = require("shelljs");

const s = `commands${path.sep}${path.basename(__filename)}`;
const log = signale.scope(s);

module.exports = {
    cmd: {
        name: "fcode",
        usage: "",
        description: "初始化一个prettier的配置文件"
    },
    exec: pwd => {
        const file = "prettierrc.js";
        const rcPath = path.join(__dirname, "..", "template", file);
        shell.cp(rcPath, path.join(pwd, `.${file}`));
        log.complete("Success");
    }
};
