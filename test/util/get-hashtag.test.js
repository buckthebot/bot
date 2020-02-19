const chai = require("chai");
const getHashtag = require("../../util/get-hashtag");

describe("get hash tag", () => {

    it("converts day name to a hashtag", () => {
        chai.assert.strictEqual(getHashtag("Don't Make Your Bed Day"), "#DontMakeYourBedDay");
        chai.assert.strictEqual(getHashtag("Boss’ Day"), "#BossDay");
        chai.assert.strictEqual(getHashtag("D.A.R.E. Day"), "#DAREDay");
        chai.assert.strictEqual(getHashtag("Chocolate-Covered Cherry Day"), "#ChocolateCoveredCherryDay");
        chai.assert.strictEqual(getHashtag("Pokémon Day"), "#PokemonDay");
        chai.assert.strictEqual(getHashtag("International Underlings Day"), "#UnderlingsDay");
        chai.assert.strictEqual(getHashtag("World UFO Day"), "#UFODay");
        chai.assert.strictEqual(getHashtag("Change the World Day"), "#ChangeTheWorldDay");
        chai.assert.strictEqual(getHashtag("Amnesty International Day"), "#AmnestyInternationalDay");
    });
});