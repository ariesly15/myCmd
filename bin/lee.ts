#!/usr/bin/env node
/* eslint-disable no-console */

const cli = require("commander");
const chalk = require("chalk");
const fse = require("fs-extra");
const path = require("path");
const signale = require("signale");

global.signale = signale;

const cmdPath = path.join(__dirname, "..", "src", "commands");

// [Function] and
// 通过遍历的形式设置 option
// https://github.com/tj/commander.js/pull/140
cli.Command.prototype.and = function(fn) {
    fn.call(this, this);
    return this;
};

cli.version(require("../package").version).usage("<command> [options]");

cli.command("info")
    .description("print debugging information about your environment")
    .action(() => {
        console.log(chalk.bold("\nEnvironment Info:"));
        require("envinfo")
            .run(
                {
                    System: ["OS", "CPU"],
                    Binaries: ["Node", "Yarn", "npm"],
                    Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
                    npmGlobalPackages: ["nrm"]
                },
                {
                    showNotFound: true,
                    duplicates: true,
                    fullTree: true
                }
            )
            .then(console.log);
    });

fse.readdirSync(cmdPath).forEach(file => {
    if (file !== "index.js" && path.extname(file) === ".js") {
        const cmdFile = require(path.join(cmdPath, file));

        cli.command(cmdFile.cmd.name)
            .usage(cmdFile.cmd.usage)
            .description(cmdFile.cmd.description)
            .and(function(cli) {
                if (cmdFile.cmd.options) {
                    cmdFile.cmd.options.forEach(function(option) {
                        cli.option(option.pattern, option.desc, option.default);
                    });
                }
            })
            .action(function(...args) {
                cmdFile.exec(process.cwd(), ...args);
            });
    }
});

// output help information on unknown commands
cli.arguments("<command>").action(cmd => {
    cli.outputHelp();
    console.log("  " + chalk.red(`Unknown command ${chalk.red(cmd)}.`));
    console.log();
});

cli.parse(process.argv);
