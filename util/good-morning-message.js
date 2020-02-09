const fs = require("fs");
const Sentiment = require("../util/sentiment");
const dayNameSentiment = require("../util/day-name-sentiment");

function getHashTag(dayName) {
    return "#" + dayName.replace(/International/g, "")
        .replace(/World/g, "")
        .replace(/ /g, "");
}

/**
 * List of possible greetings to post on Tweeter. The number indicates the maximum sentiment score a day name
 * may have in order to use the greeting.
 */
const HELLO_MESSAGES = [
    [-0.3, ["I come in peace, humans!", "Good morning people!", "Humans!", "Greetings!", "Hello!"]],
    [0.3, ["Hey there!", "Nice to see you!", "How are you?", "Good day!", "Hi!"]],
    [1, ["Sup!", "I love you humans!", "What's up?", "Yo!", "Howdy!"]]
];

/**
 * List of possible messages to post on Tweeter. The number indicates the maximum sentiment score a day name
 * may have in order to use the message.
 */
const DAY_MESSAGES = [
    [-0.5, [
        "Don't forget it's {day} today!",
        "Do you remember it's {day} today?",
        "How are you going to make the world a better place on {day}?"
    ]],
    [-0.1, [
        "It's {day} today! What are you going to do with it?",
        "Today is an important day - {day}! Make it count!",
        "Do you know what day its? It's {day}!"
    ]],
    [0.1, [
        "Happy {day}!",
        "Enjoy {day}!",
        "It's {day}!"
    ]],
    [0.5, [
        "It's going to be an awesome day. It's {day}!",
        "It's a beautiful day - {day}!",
        "I know you all have been waiting for this day - it's {day}!"
    ]],
    [1, [
        "Time to have some fun! It's {day}!",
        "I've been waiting for it the whole year! It's {day} today!",
        "Let's celebrate! It's {day}!"
    ]]
];

/**
 * Picks a random message for the given sentiment score.
 * The message will be picked from the list that has the maximum allowed sentiment score
 * higher than the given score.
 */
function pickMessage(messages, score) {
    for (var i=0; i<messages.length; i++) {
        if (score <= messages[i][0]) {
            const randomIndex = Math.floor(Math.random() * messages[i][1].length);
            return messages[i][1][randomIndex];
        }
    }
    return "";
}

module.exports = function(date) {
    const seniment = new Sentiment();
    const content = JSON.parse(fs.readFileSync("./data/days-of-the-year.json", { encoding: "utf-8" }));
    const currentDate = date || new Date();
    const dateKey = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
    const days = content[dateKey];

    if (days.length) {
        const randomDay = days[Math.floor(Math.random() * days.length)];
        const sentimentScore = dayNameSentiment(seniment, randomDay);
        const hashTag = getHashTag(randomDay);
        const hello = pickMessage(HELLO_MESSAGES, sentimentScore);
        const dayMessage = pickMessage(DAY_MESSAGES, sentimentScore).replace("{day}", hashTag);

        return `${hello} ${dayMessage}`;
    }
};