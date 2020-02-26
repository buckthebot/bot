const mock = require('mock-require');

const IgMock = require("../mock/util/ig.mock");
mock("../../util/ig", IgMock);
const TweetMock = require("../mock/util/tweet.mock");
mock("../../util/tweet", TweetMock);

const chai = require("chai");
const sinon = require("sinon");
const dealAndTweet = require("../../script/deal-and-tweet");

describe("deal and tweet", () => {

    var stubStrategy;

    beforeEach(() => {
        stubStrategy = {
            name: "Name",
            predict: sinon.stub().returns(1),
            tags: "#test"
        };

        IgMock.cleanUp();
        TweetMock.cleanUp();
    });

    it('test dealing and tweeting', async function() {
        IgMock.setupConfirmation(true, 100);

        await dealAndTweet(stubStrategy);
        chai.assert.strictEqual(TweetMock.lastStatus, "Going long on $FTSE @ 100! #test");

        stubStrategy.predict.returns(-1);
        await dealAndTweet(stubStrategy);
        chai.assert.strictEqual(TweetMock.lastStatus, "Going short on $FTSE @ 100! #test");

    });

});