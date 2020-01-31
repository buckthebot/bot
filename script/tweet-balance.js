const checkBalance = require("../util/check-balance");
const tweet = require("../util/tweet");

module.exports = function() {
    checkBalance((balance) => {
        if (balance !== undefined) {
            const status = "My current balance: £" + balance.toFixed(2);
            tweet(status, () => {
                console.log("New status:", status);
            });
        }
        else {
            console.log("Unknown balance :(")
        }
    });
};
