const path = require("path");
const chalk = require("chalk");
const shell = require("shelljs");
const { isFile } = require("../utils");

const s = `commands${path.sep}${path.basename(__filename)}`;

module.exports = {
    cmd: {
        name: "run",
        usage: "",
        description: "读取配置文件执行一系列命令",
        options: [
            {
                pattern: "-c, --config-file <file>",
                desc: "配置文件路径",
                default: ""
            },
            {
                pattern: "-s, --silent [bool]",
                desc: "静默(不输出日志)",
                default: true
            },
            {
                pattern: "-i, --index [index]",
                desc: "指定执行第几项(逗号分隔 eg:1,2)",
                default: ""
            }
        ]
    },
    exec: (pwd, opts) => {
        const exec = (item, idx, opts) => {
            const log = signale.scope(s, `script${idx}`);
            log.log(chalk.magentaBright("DIR:"), chalk.blueBright(item.dir));
            log.log(chalk.magentaBright("CMD:"), chalk.blueBright(item.script));
            const result = shell.exec(item.script, {
                cwd: item.dir,
                silent: opts.silent === "false" ? false : true
            });
            if (result.code !== 0) {
                log.error("\n", result.stderr);
                process.exit(1);
            }
            log.complete();
        };

        shell.exec("clear");
        let filePath = opts.configFile;
        const idxs = opts.index;
        if (isFile(filePath)) {
            filePath = path.resolve(process.cwd(), filePath);
            let scripts = require(filePath).scripts;
            if (idxs) scripts = scripts.filter((item, i) => idxs.includes(i));
            scripts.map((item, idx) => exec(item, idx, opts));
        }
    }
};
