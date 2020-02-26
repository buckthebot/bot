const mock = require('mock-require');

const IgMock = require("../mock/util/ig.mock");
mock("../../util/ig", IgMock);

const chai = require("chai");
const sinon = require("sinon");
const deal = require("../../script/deal");
const Ig = require("../../util/ig");

describe("deal", () => {

    var client,
        stubStrategy;

    beforeEach(() => {
        IgMock.cleanUp();
        client = new Ig();
        stubStrategy = {
            name: "Name",
            predict: sinon.stub().returns(1),
            tags: "#test"
        }
    });

    it('test successful deal', async function() {
        IgMock.setupConfirmation(true, 100);

        var confirmation = await deal(stubStrategy);

        chai.assert.strictEqual(confirmation.status, "NEW_DEAL");
        chai.assert.strictEqual(confirmation.level, 100);
    });

    it('test failed deal', async function() {
        IgMock.setupConfirmation(false, null);

        var confirmation = await deal(stubStrategy);

        chai.assert.strictEqual(confirmation.status, "ERROR");
    });

});
