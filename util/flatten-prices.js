/**
 * Convert HLOC prices to MID CLOSE price
 * @param prices
 * @returns {Number[]}
 */
module.exports = function(prices) {
    return prices.map(price => (price.closePrice.bid + price.closePrice.ask) / 2);
};