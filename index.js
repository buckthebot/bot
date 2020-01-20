const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const options = {
    identifier: process.env.IG_IDENTIFIER || process.argv[2],
    password: process.env.IG_PASSWORD || process.argv[3],
    apiKey: process.env.IG_API_KEY || process.argv[4]
};
const checkBalance = require("./check_balance");

app.get('/', (req, res) => {
    checkBalance(options, (balance) => {
        const balanceText = balance === undefined ? "No sure if I have any money." : ("I have £" + balance);
        res.send('Hello World!' + balanceText);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
