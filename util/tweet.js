const Twitter = require('twitter');
const { twitterOptions } = require("./configs");

module.exports = function(status, callback) {
    const client = new Twitter(twitterOptions);
    client.post('statuses/update', { status },  function(error) {
        if (error) {
            console.error(error);
        }
        callback(error);
    });
};