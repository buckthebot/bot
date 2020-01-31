const CronJob = require("cron").CronJob;

var job = new CronJob('0 * * * * *', function () {
    console.log("Current time: ", new Date());
}, null, true, 'Europe/London');
job.start();
