var Ig = require("../util/ig");
const { igOptions } = require("../util/configs");
const tweet = require("../util/tweet");

module.exports = async function() {
    const client = new Ig(igOptions);
    const balance = await client.checkBalance();

    const data = await client.getActivity({
        milliseconds: 24 * 60 * 60 * 1000,
    });

    const profits = data.transactions.map(entry => parseFloat(entry.profitAndLoss.replace(/[^0-9.-]/g,"")));
    const total = profits.reduce((p, n) => p + n, 0);
    const info = `Today: ${profits.length} transactions; profit/loss (£): ${total.toFixed(2)}.`;

    if (balance !== undefined) {
        const status = `Current total: £${balance.toFixed(2)}!\n\n${info}`;
        tweet(status, () => {
            console.log("New status:", status);
        });
    }
    else {
        console.log("Unknown balance :(")
    }
};
