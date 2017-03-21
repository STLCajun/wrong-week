const _ = require('lodash');
const twitter = require('./../twitter/twitter.js');

class Tweets {
    constructor () {
        this.tweets = {};
        this.checkTweets();
    }

    updateTweet(status) {
        if (!_.isEmpty(status)) {
            this.tweets = status;
            return status;
        } else {
            return this.tweets;
        }
    }

    getTweets() {
        return this.tweets;
    }

    checkTweets() {

        var string = '" I picked the wrong week to" OR " we picked the wrong week to"';
        twitter.getResults(string).then((tweet) => {
            this.updateTweet(tweet);
        }, (err) => {
            //console.log('There was a problem', err);
        });
    }
}

module.exports = {Tweets};