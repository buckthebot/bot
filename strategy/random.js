module.exports = {
    name: "random",
    predict: function(prices) {
        return Math.random() < 0.5 ? 1 : -1;
    },
    tags: "#RandomTrading #DontDoItAtHome"
};