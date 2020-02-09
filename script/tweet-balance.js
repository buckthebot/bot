const checkBalance = require("../util/check-balance");
const tweet = require("../util/tweet");

module.exports = function() {
    checkBalance((balance) => {
        if (balance !== undefined) {
            const status = `Current total: £${balance.toFixed(2)}. #2brokedevs`;
            tweet(status, () => {
                console.log("New status:", status);
            });
        }
        else {
            console.log("Unknown balance :(")
        }
    });
};
