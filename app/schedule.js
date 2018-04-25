const CronJob = require('cron').CronJob;

const job = new CronJob('*/5 * * * * *', function () {
    console.log('You will see this message every 5 seconds');
}, null, true);