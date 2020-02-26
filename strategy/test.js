var fs = require("fs");
var flatterPrices = require("../util/flatten-prices");
var randomStrategy = require("./random");
var trendStrategy = require("./trend");

var dataSets = [
    { name: "FTSE", path: "./data/sample-ftse.json", lot: 1 },
    { name: "GBP/USD", path: "./data/sample-gbp-usd.json", lot: 10000 },
    { name: "Gold", path: "./data/sample-gold.json", lot: 1 }
];

function loadData(path) {
    var pricesData = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
    return flatterPrices(pricesData.prices);
}

function prepareTests(prices) {
    var setLength = 20,
        tests = [];

    for (var i=0; i < prices.length - setLength; i++) {
        tests.push({
            prices: prices.slice(i, i + setLength),
            next: prices[i + setLength]
        })
    }

    return tests;
}

function test(strategies) {

    dataSets.forEach(set => {
        console.log(`\nTesting strategies on ${set.name}`);
        console.log("==============================");
        var prices = loadData(set.path);
        var tests = prepareTests(prices);
        var results = strategies.map(s => { return { strategy: s, profit: 0 }});

        tests.forEach(test => {
            results.forEach(result => {
                var direction = result.strategy.predict(test.prices);
                result.profit += (test.next - test.prices[test.prices.length - 1]) * direction * set.lot;
            });
        });

        results.forEach(result => {
            console.log(result.strategy.name, result.profit.toFixed(2));
        });
    });

    console.log("");
}

test([ randomStrategy, trendStrategy ]);
