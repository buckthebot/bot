const fs = require("fs");

function Sentiment() {
    // data from: https://hlt-nlp.fbk.eu/technologies/sentiwords
    const sentiWords = fs.readFileSync("./data/SentiWords_1.1.txt", { encoding: "utf-8" });
    const lines = sentiWords.split("\n");

    // map word->sentiment score, discarding PoS, just taking the first matching
    this.words = {};

    lines.forEach((line) => {
       if (line.length && !line.startsWith('#')) {
           const [word, pp] = line.split('#');
           const [pos, polarity] = pp.split(/\s+/);

           // spaces are represented as "_" in the source file
           this.words[word.replace("_", "")] = parseFloat(polarity);
       }
    });
}

/**
 * Return sentiment score. Case-insensitive.
 */
Sentiment.prototype.getSentiment = function(word) {
    const w = word.toLowerCase();
    return this.words[w];
};

module.exports = Sentiment;