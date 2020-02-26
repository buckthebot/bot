function IgMock(options) {}

IgMock.cleanUp = function() {
    this.getPositionsResult = [];
    this.getDataResult = { prices: [] };
    this.dealResult = "";
    this.confirmationResult = {};
};

IgMock.prototype.getPositions = async function() {
    return IgMock.getPositionsResult;
};

IgMock.prototype.getData = async function() {
    return IgMock.getDataResult;
};

IgMock.prototype.deal = async function() {
    return IgMock.dealResult;
};

IgMock.setupConfirmation = function(success, level) {
    this.confirmationResult = { reason: success ? "SUCCESS" : "UNKNOWN", level };
};
IgMock.prototype.confirmation = async function() {
    return IgMock.confirmationResult;
};

module.exports = IgMock;