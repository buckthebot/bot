var request = require("request");

module.exports = function(options, callback) {
    request({
        method: "POST",
        url: "https://demo-api.ig.com/gateway/deal/session",
        json: true,
        body: {
            identifier: options.identifier,
            password: options.password
        },
        headers: {
            "X-IG-API-KEY": options.apiKey,
            "Version": 2
        }
    }, function(error, response, body) {
        if (response && response.statusCode === 200) {
            callback(parseFloat(body.accountInfo.balance));
        } else {
            console.error(error, response.statusCode, body);
            callback(undefined);
        }
    });
};

