var socket = io();

socket.on('connect', function() {
   socket.emit('join', {}, function(err) {
       if (err) {
           alert(err);
       } else {
           // console.log('Connected');
       }
   })
});

socket.on('disconnect', function() {
    // console.log('Disconnected from server');
});

socket.on('newTweet', function(tweet) {
    var template = $('#bubble-content-template').html();
    var html = Mustache.render(template, {
        text: tweet.text,
        user: {
            name: tweet.user.name,
            screen_name: tweet.user.screen_name,
            location: tweet.user.location,
            profile_image_url: tweet.user.profile_image_url
        }
    });
    $('.bubble').html(html);
});