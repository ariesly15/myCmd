const opentype = require("opentype.js");
const chalk = require("chalk");
const fs = require("fs");

const readFont = (module.exports = {
    run: urlOrPath => {
        if (urlOrPath.indexOf("http") === 0) {
            // eslint-disable-next-line no-console
            console.log("url");
        } else {
            urlOrPath = "/Users/aweleey/Public/codeleey/myCmd/src/readFont/iconfont-0.0.8.ttf";
            if (fs.existsSync(urlOrPath)) {
                getFontFalimyName(urlOrPath);
            } else {
                throw new Error(`请检查 ${chalk.red(urlOrPath)} 文件是否存在`);
            }
        }
    }
});

function getFontFalimyName(path) {
    opentype.load(path, function(err, font) {
        if (err) {
            throw err;
        }
        // eslint-disable-next-line no-console
        console.log(
            "\n",
            chalk.bold("fontFamilyName:::"),
            chalk.green(font.names.fontFamily.en),
            "\n"
        );
    });
}

if (require.main === module) {
    readFont.run("abc");
}
