const fs = require("fs");
const Sentiment = require("../util/sentiment");

const daysOfTheYear = JSON.parse(fs.readFileSync("./data/days-of-the-year.json", { encoding: "utf-8" }));

const sentiment = new Sentiment();

var stats = [];

for (var i=0; i <= 366; i++) {
    const currentDate = new Date(2020, 0, i+1);
    const dateKey = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
    const days = daysOfTheYear[dateKey];

    if (days) {

        days.forEach(function(day) {
            // discard common words
            const wordsSentiment = day.replace(/International/g, "")
                .replace(/World/g, "")
                .replace(/Day/g, "")
                .split(" ")
                .filter(function(word) {
                    return word.trim().length;
                })
                .map(function(word) {
                    return sentiment.getSentiment(word) || 0;
                });

            // calculate sum of the sentiment
            const total = wordsSentiment.reduce(function(prev, next) {
                return prev + next;
            }, 0);

            // and the average
            const avg = total / wordsSentiment.length;

            stats.push([currentDate, day, avg])

        });
    }
}

stats.sort(function(a,b) {
    return b[2] - a[2];
});

console.log("Ranking: ");
stats.forEach(function(d, i) {
    const [ date, day, score ] = d;
    const result = `${i+1}. ${day} (${date.getDate()}/${date.getMonth()+1})`.padEnd(80);
    console.log(`${result} ${score.toFixed(3)}`);
});
