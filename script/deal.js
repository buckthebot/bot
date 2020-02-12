var Ig = require("../util/ig");
const { igOptions } = require("../util/configs");

async function deal() {
    const client = new Ig(igOptions);

    try {
        // potential bug: request sometimes returns an empty list when positions exist
        // temporarily making 3 requests to ensure the value is correct
        let attempts = 3;
        let positions = [];
        while (attempts && positions.length === 0) {
            positions = await client.getPositions();
            attempts--;
        }

        // If there are no deals, create a new random deal
        if (positions.length === 0) {
            // hardcoded deal params, only direction is randomised
            const dealParams = {
                epic: "IX.D.FTSE.MTI.IP",
                size: 1,
                direction: Math.random() < 0.5 ? "BUY" : "SELL",
                limitDistance: 15, // lotSize for the market is 10 meaning max profit/loss on a position is 150 (size*lot*distance)
                stopDistance: 15,
                currencyCode: "GBP"
            };
            const dealReference = await client.deal(dealParams);
            const confirmation = await client.confirmation(dealReference);
            const success = confirmation.reason === "SUCCESS";
            return success ? { status: "NEW_DEAL", dealParams } : { status: "ERROR" };
        }
        // otherwise return current profit or loss
        else {
            const [position] = positions;

            const directionFactor = position.position.direction === "BUY" ? 1 : -1;
            const closeAt = position.position.direction === "BUY" ? position.market.bid : position.market.offer;
            const profit = directionFactor * ((closeAt - position.position.level) * position.position.size * position.market.lotSize);
            return { status: "DEALING", profit };
        }

    } catch (e) {
        console.error(e.message);

        if (process.env.BUCK_DEBUG) {
            console.log(e.stack);
        }
    }

}

module.exports = deal;