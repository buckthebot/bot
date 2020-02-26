function tweetMock(status, callback) {
    tweetMock.lastStatus = status;
    callback(tweetMock.error);
}

tweetMock.cleanUp = function() {
    this.error = undefined;
};

module.exports = tweetMock;