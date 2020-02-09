module.exports = function(sentiment, dayName) {
    // discard common words
    const wordsSentiment = dayName.replace(/International/g, "")
        .replace(/World/g, "")
        .replace(/Day/g, "")
        .split(" ")
        .filter(function(word) {
            return word.trim().length;
        })
        .map(function(word) {
            return sentiment.getSentiment(word) || 0;
        });

    // calculate sum of the sentiment
    const total = wordsSentiment.reduce(function(prev, next) {
        return prev + next;
    }, 0);

    return total / wordsSentiment.length;
};