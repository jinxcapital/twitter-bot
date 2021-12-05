import cron from 'node-cron';

import tasks from './tasks';

cron.schedule('* * * * *', tasks.ping);
