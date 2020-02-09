const fs = require("fs");
const Sentiment = require("../util/sentiment");
const dayNameSentiment = require("../util/day-name-sentiment");

const daysOfTheYear = JSON.parse(fs.readFileSync("./data/days-of-the-year.json", { encoding: "utf-8" }));

const sentiment = new Sentiment();

var stats = [];

for (var i=0; i <= 366; i++) {
    const currentDate = new Date(2020, 0, i+1);
    const dateKey = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
    const days = daysOfTheYear[dateKey];

    if (days) {

        days.forEach(function(day) {
            const avg = dayNameSentiment(sentiment, day);
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
