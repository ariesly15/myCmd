const dir = require("./dir");
const toIndex = require("./toIndex");

const rename = (module.exports = {
    run: options => {
        if (options.dir) {
            dir(options);
        } else {
            toIndex(options);
        }
    }
});

if (require.main === module) {
    rename.run({});
}
