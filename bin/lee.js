#!/usr/bin/env node
/* eslint-disable no-console */

const program = require("commander");
const chalk = require("chalk");

program.version(require("../package").version).usage("<command> [options]");

program
    .command("font <urlOrTtfPath>")
    .description("print fontFamily")
    .action(cmd => {
        require("../src/readFont").run(cmd);
    });

program
    .command("rename")
    .option("-d, --dir [bool]", "修改文件夹", false)
    .option("--prefix [string]", "修改文件夹", "")
    .action(cmd => require("../src/renameToIndex").run(cleanArgs(cmd)));

program
    .command("test [value]")
    .description("inspect and modify the config")
    .option("-e, --edit", "open config with default editor")
    .action((value, cmd) => {
        console.log("value:", value, "\ncmd:", cleanArgs(cmd));
    });

program
    .command("info")
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

// output help information on unknown commands
program.arguments("<command>").action(cmd => {
    program.outputHelp();
    console.log("  " + chalk.red(`Unknown command ${chalk.red(cmd)}.`));
    console.log();
});

program.parse(process.argv);

function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
    const args = {};
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ""));
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== "function" && typeof cmd[key] !== "undefined") {
            args[key] = cmd[key];
        }
    });
    return args;
}
