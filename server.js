require('./config/config');
const http = require('http');
const path = require('path');
const express = require('express');
const {Tweets} = require('./utils/tweets');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const hbs = require('hbs');

const port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

var tweets = new Tweets();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.htm'));
});

io.on('connection', (socket) => {
    socket.on('join', (params, callback) => {
        //console.log('user connected');
    });

    io.emit('newTweet', tweets.getTweets());

    setInterval(() => {
        io.emit('newTweet', tweets.getTweets());
    }, 30000);

    socket.on('disconnect', (params, callback) => {
        // console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

setInterval(() => {
    tweets.checkTweets();
}, 30000);