import cron from 'node-cron';

import tasks from './tasks';

cron.schedule('* * * * *', tasks.ping);
cron.schedule('30 05 * * *', tasks.gm);
