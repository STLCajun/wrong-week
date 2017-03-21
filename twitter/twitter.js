require('./../config/config');
const twitter = require('twitter');

var client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var getResults = (queryString) => {

    return new Promise((resolve, reject) => {
        var params = {q: queryString};

        client.get('search/tweets', params, (error, tweets, response) => {
            if (!error) {

                tweets.statuses.forEach((tweet, index, object) => {
                    if(
                        typeof tweets.statuses[index].retweeted_status === 'object' ||
                        typeof tweets.statuses[index].retweeted_status !== 'undefined' ||
                        tweets.statuses[index].text.startsWith('RT')
                        ) {
                        tweets.statuses.splice(index,1);
                    }
                });

                resolve(tweets.statuses[0]);
            } else {
                reject(error);
            }
        });
    });

};

module.exports = {
    getResults
};