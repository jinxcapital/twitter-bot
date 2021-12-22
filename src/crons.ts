import cron from 'node-cron';

import tasks from './tasks';

cron.schedule('* 00 * * *', tasks.ping);
cron.schedule('00 06 * * *', tasks.gm);
