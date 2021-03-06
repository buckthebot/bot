const deal = require("../script/deal");
const tweet = require("../util/tweet");

async function dealAndTweet(strategy) {
    const status = await deal(strategy);
    let message = null;
    if (status.status === "NEW_DEAL") {
        const direction = status.dealParams.direction === "BUY" ? "long" : "short";
        message = `Going ${direction} on $FTSE @ ${status.level}! ${strategy.tags}`;
    } else if (status.status === "DEALING") {
        if (status.profit > 0) {
            message = `Yes! Making some bucks! Current position profit: £${status.profit.toFixed(2)}`;
        }
        else if (status.profit < 0) {
            message = `Oh no! Losing some bucks! Current position loss: £${-status.profit.toFixed(2)}`;
        } else {
            message = `Current position profit: £${status.profit.toFixed(2)}`;
        }
    }

    if (message) {
        tweet(message, () => {
            console.log("New status:", message);
        });
    }
}

module.exports = dealAndTweet;