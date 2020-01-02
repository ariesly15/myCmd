import * as path from 'path';
import * as fse from 'fs-extra';
import * as inquirer from 'inquirer';
import signale from 'signale';
const { isFile } = require("../utils");
import {TEMP_NAME, TEMP_USAGE, TEMP_DESC } from '../common/const';

const s = `commands${path.sep}${path.basename(__filename)}`;
const log = signale.scope(s);

export default {
    cmd: {
        name: "initcmd",
        usage: "[Wath is usage ?]",
        description: "在 commands 目录下初始化一个文件",
        options: [
            {
                pattern: "-w, --watch",
                desc: "I watch you"
            }
        ]
    },
    exec: () => {
        const cmdPath = path.join(__dirname, "..", "commands");
        const cmdTemplatePath = path.join(__dirname, "..", "template", "cmd.ts");
        const questions = [
            {
                type: "input",
                name: "name",
                message: "cmd name",
                validate: (input: string) => {
                    if (!input) {
                        return "Can't be empty";
                    }
                    let exist = fse.readdirSync(cmdPath).some(item => {
                        if (isFile(path.join(cmdPath, item))) {
                            return path.basename(item, ".ts") == input;
                        }
                    });
                    return exist ? "The file already exists。" : true;
                }
            },
            {
                type: "input",
                name: "usage",
                message: "cmd usage"
            },
            {
                type: "input",
                name: "description",
                message: "cmd description"
            }
        ];
        inquirer.prompt(questions).then((answer: any) => {
            const { name, usage, description } = answer;
            const tempStr = fse
                .readFileSync(cmdTemplatePath)
                .toString()
                .replace(TEMP_NAME, name)
                .replace(TEMP_USAGE, usage)
                .replace(TEMP_DESC, description);
            fse.writeFileSync(path.join(cmdPath, `${name}.ts`), tempStr);
            log.complete("初始化完成");
        });
    }
};
