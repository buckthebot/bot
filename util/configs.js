const igOptions = {
    identifier: process.env.IG_IDENTIFIER ,
    password: process.env.IG_PASSWORD,
    apiKey: process.env.IG_API_KEY
};

const twitterOptions = {
    consumer_key: process.env.TWEETER_CONSUMER_KEY,
    consumer_secret: process.env.TWEETER_CONSUMER_SECRET,
    access_token_key: process.env.TWEETER_ACCESS_TOKEN,
    access_token_secret: process.env.TWEETER_ACCESS_SECRET
};

module.exports = { igOptions, twitterOptions };