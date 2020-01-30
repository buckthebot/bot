const express = require('express');
const app = express();
const port = process.env.PORT;
const checkBalance = require("../util/check-balance");

module.exports = function() {
    app.get('/', (req, res) => {
        checkBalance((balance) => {
            const balanceText = balance === undefined ? "No sure if I have any money." : ("I have £" + balance);
            res.send('Hello World! ' + balanceText);
        });
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};