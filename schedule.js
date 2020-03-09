const CronJob = require("cron").CronJob;
const tweetBalance = require("./script/tweet-balance");
const tweetMorningMessage = require("./script/tweet-morning-message");
const dealAndTweet = require("./script/deal-and-tweet");
const coronavirusStrategy = require("./strategy/coronavirus");

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
    tweetMorningMessage();
});

// deal, Mon-Fri
cron("0 5 9-17 * * 1-5", dealAndTweet.bind(null, coronavirusStrategy));

// check the balance at 18 Mon-Fri
cron("0 0 18 * * 1-5", tweetBalance);

// say goodbye at 20 (20:30 workflow will shut down the worker)
cron("0 0 20 * * *", function () {
    console.log("Bye bye now!");
});
