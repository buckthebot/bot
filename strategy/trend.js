module.exports = {
    name: "trend",
    predict: function(prices) {
        var trend = 0,
            size = 10;

        if (prices.length <= size) {
            console.warn("Not enough data points.");
        }

        for (var i=prices.length-size; i<prices.length; i++) {
            trend += (prices[i] - prices[i-1]) * (i - prices.length + size + 1) / size;
        }
        return trend > 0 ? 1 : -1;
    },
    tags: "#FollowTheTrend"
};