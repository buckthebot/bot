var Ig = require("../util/ig");
const { igOptions } = require("../util/configs");
const tweet = require("../util/tweet");

module.exports = async function() {
    const client = new Ig(igOptions);
    const balance = await client.checkBalance();

    if (balance !== undefined) {
        const status = `Current total: £${balance.toFixed(2)}! #2brokedevs (https://medium.com/@buckthebot)`;
        tweet(status, (error) => {
            if (error) {
                console.error(error);
            }
            console.log("New status:", status);
        });
    }
    else {
        console.log("Unknown balance :(")
    }
};
