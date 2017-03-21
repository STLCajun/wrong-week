require('./config/config');
const express = require('express');
const app = express();
const hbs = require('hbs');
const {Tweets} = require('./utils/tweets');

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
var tweets = new Tweets();

// Run Immediate Check for Tweets
tweets.checkTweets();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('homepage', tweets.getTweets());
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

setInterval(() => {
    tweets.checkTweets();
}, 30000);