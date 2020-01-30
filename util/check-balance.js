const request = require("request");
const { igOptions } = require("./configs");

module.exports = function(callback) {
    request({
        method: "POST",
        url: "https://demo-api.ig.com/gateway/deal/session",
        json: true,
        body: {
            identifier: igOptions.identifier,
            password: igOptions.password
        },
        headers: {
            "X-IG-API-KEY": igOptions.apiKey,
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

