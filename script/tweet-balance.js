const checkBalance = require("../util/check-balance");
const tweet = require("../util/tweet");

checkBalance((balance) => {
    const status = "My current balance: £" + (balance ? balance.toFixed(2) : "???");
    tweet(status, () => {
        console.log("New status:", status);
    });
});