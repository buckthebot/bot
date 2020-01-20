var request = require("request");

request({
    method: "POST",
    url: "https://demo-api.ig.com/gateway/deal/session",
    json: true,
    body: {
        identifier: process.argv[2],
        password: process.argv[3]
    },
    headers: {
        "X-IG-API-KEY": process.argv[4],
        "Version": 2
    }
}, function(error, response, body) {
    if (response && response.statusCode === 200) {
        console.log("Your current balance is:", "£" + body.accountInfo.balance);
    }
});