import * as path from 'path';
import signale from 'signale';

const s = `commands${path.sep}${path.basename(__filename)}`;
const log = signale.scope(s);

module.exports = {
    cmd: {
        name: '[[TEMP_NAME]]',
        usage: '[[TEMP_USAGE]]',
        description: '[[TEMP_DESC]]',
        options: [
            {
                pattern: '-t, --test',
                desc: 'TEST',
                default: ''
            }
        ]
    },
    exec: (pwd, options) => {
        log.star(pwd, options);
    }
};
