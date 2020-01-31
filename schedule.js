const CronJob = require("cron").CronJob;
const tweetBalance = require("./script/tweet-balance");

function cron(pattern, task) {
    new CronJob(pattern, task, null, true, 'UTC');
}

/** Buck's schedule: */

// check the time every hour
cron("0 0 * * * *", function () {
    console.log("Current time:", new Date());
});

// say good morning at 9 o'clock (UTC) (worker should be up since 8:30)
cron("0 0 9 * * *", function () {
    console.log("Good morning!");
});

// check the balance at 10
cron("0 0 10 * * *", tweetBalance);

// say goodbye at 20 (20:30 workflow will shut down the worker)
cron("0 0 20 * * *", function () {
    console.log("Bye bye now!");
});
