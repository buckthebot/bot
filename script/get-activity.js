const Ig = require("../util/ig");
const { igOptions } = require("../util/configs");

async function main() {
    const client = new Ig(igOptions);

    const data = await client.getActivity({
        milliseconds: 24 * 60 * 60 * 1000,
    });

    const profits = data.transactions.map(entry => parseFloat(entry.profitAndLoss.replace(/[^0-9.-]/g,"")));
    const total = profits.reduce((p, n) => p + n, 0);
    console.log(`Transactions: ${profits.length}, profit/loss (£): ${total.toFixed(2)}`);
}

main();