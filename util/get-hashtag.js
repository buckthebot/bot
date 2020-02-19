const _ = require("lodash");

module.exports = function getHashtag(dayName) {
    return "#" + _.deburr(dayName) // convert to latin
        // remove "International" and...
        .replace(/^International/g, "")
        // ..."World" from the beginning
        .replace(/^World/g, "")
        // skip apostrophes
        .replace(/['’]+/g,"")
        // split by non-letters
        .split(/\W+/g)
        // skip empty strings
        .filter(word => word)
        // uppercase the first letter
        .map(word => word[0].toLocaleUpperCase() + word.slice(1))
        // join all words
        .join("");
};
