const goodMorningMessage = require("../util/good-morning-message");
const tweet = require("../util/tweet");

module.exports = function() {
    const message = goodMorningMessage();
    tweet(message, () => {
        console.log("New status:", message);
    });
};
