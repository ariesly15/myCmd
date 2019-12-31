import * as path from 'path';

const s = `commands${path.sep}${path.basename(__filename)}`;
const log = signale.scope(s);

module.exports = {
    cmd: {
        name: "extts",
        usage: "",
        description: "目录下的文件后缀改为ts",
        options: [
            {
                pattern: "-t, --test",
                desc: "TEST",
                default: ""
            }
        ]
    },
    exec: (pwd: string, options: any[]) => {
        log.star(pwd, options);
    }
};
