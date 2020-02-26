const chai = require("chai");
const flatterPrices = require("../../util/flatten-prices");

const PRICES = [
    { closePrice: { ask: 10, bid: 6 }}, // mid=8
    { closePrice: { ask: 12, bid: 6 }}, // mid=9
    { closePrice: { ask: 6, bid: 4 }},  // mid=5
];

const EXPECTED = [ 8, 9, 5 ];

describe("flatten prices", () => {

    it('converts hloc to mid close prices', function () {
       chai.assert.deepEqual(flatterPrices(PRICES), EXPECTED);
    });

});