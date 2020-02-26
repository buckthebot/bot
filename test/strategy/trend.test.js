const chai = require("chai");
const trendStrategy = require("../../strategy/trend");

describe("trend strategy", () => {

    it('predicts direction', function () {

        chai.assert.strictEqual(trendStrategy.predict([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 1);
        chai.assert.strictEqual(trendStrategy.predict([0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10]), -1);
        chai.assert.strictEqual(trendStrategy.predict([0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), 1);
        chai.assert.strictEqual(trendStrategy.predict([0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]), -1);
        chai.assert.strictEqual(trendStrategy.predict([0, 1, 2, 3, 4, 5, -6, -7, -8, -9, -10]), -1);
        chai.assert.strictEqual(trendStrategy.predict([0, -1, -2, -3, -4, -5, 6, 7, 8, 9, 10]), 1);
        chai.assert.strictEqual(trendStrategy.predict([0, -1, 2, -3, 4, -5, 6, -7, 8, -9, 10]), 1);
        chai.assert.strictEqual(trendStrategy.predict([0, 1, -2, 3, -4, 5, -6, 7, -8, 9, -10]), -1);

    });

});