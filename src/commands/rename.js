const dirAddPrefix = require("../libs/rename/dirAddPrefix");
const fileNameToIndex = require("../libs/rename/fileNameToIndex");

module.exports = {
    cmd: {
        name: "rename",
        usage: "",
        description: "",
        options: [
            {
                pattern: "-d, --dir [bool]",
                desc: "修改文件夹",
                default: false
            },
            {
                pattern: "--prefix [string]",
                desc: "文件夹添加前缀",
                default: ""
            }
        ]
    },
    exec: (pwd, options) => {
        if (options.dir) {
            dirAddPrefix(options);
        } else {
            fileNameToIndex(options);
        }
    }
};
