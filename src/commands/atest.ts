import * as path from 'path';
import signale from 'signale';

const s = `commands${path.sep}${path.basename(__filename)}`;
const log = signale.scope(s);

export default {
    cmd: {
        name: 'atest',
        usage: '你想干啥[usage]',
        description: '我也不知道[description]',
        options: [
            {
                pattern: '-w, --watch',
                desc: 'I watch you'
            }
        ]
    },
    exec: (pwd: string, options: any[]) => {
        log.star('pwd:::', pwd);
        console.dir(options);
    }
};
