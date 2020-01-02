#!/usr/bin/env node
/* eslint-disable no-console */

// import figlet from 'figlet';
import commander from 'commander';
import chalk from 'chalk';
import signale from 'signale';
import * as fse from 'fs-extra';
import * as path from 'path';

const log = signale.scope('[ lee ]');
const cmdPath = path.join(__dirname, '..', 'src', 'commands');

// [Function] and
// 通过遍历的形式设置 option
// https://github.com/tj/commander.js/pull/140
commander.Command.prototype.and = function(fn) {
    fn.call(this, this);
    return this;
};
commander.version(require('../package.json')).usage('<command> [options]');

commander
    .command('info')
    .description('print debugging information about your environment')
    .action(() => {
        console.log(chalk.bold('\nEnvironment Info:'));
        require('envinfo')
            .run(
                {
                    System: ['OS', 'CPU'],
                    Binaries: ['Node', 'Yarn', 'npm'],
                    Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
                    npmGlobalPackages: ['nrm']
                },
                {
                    showNotFound: true,
                    duplicates: true,
                    fullTree: true
                }
            )
            .then(console.log);
    });

fse.readdirSync(cmdPath).forEach((file: string) => {
    if (file !== 'index.js' && /\.[jt]s/.test(path.extname(file))) {
        let cmdFile = require(path.join(cmdPath, file));
        if (cmdFile.default) cmdFile = cmdFile.default;
        commander
            .command(cmdFile.cmd.name)
            .usage(cmdFile.cmd.usage)
            .description(cmdFile.cmd.description)
            .and(function(cli: commander.CommanderStatic) {
                if (cmdFile.cmd.options) {
                    cmdFile.cmd.options.forEach(function(option) {
                        cli.option(option.pattern, option.desc, option.default);
                    });
                }
            })
            .action(function(...args: any[]) {
                cmdFile.exec(process.cwd(), ...args);
            });
    }
});

// output help information on unknown commands
commander.arguments('<command>').action(cmd => {
    commander.outputHelp();
    log.error(`\nUnknown command ${chalk.red(cmd)}.\n`);
});

commander.parse(process.argv);
// figlet.text('lee', { font: 'Big Money-se' }, (err, data) => {
//     if (!err) console.log(data);
//     log.complete('................ done');
// });
