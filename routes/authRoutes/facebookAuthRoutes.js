const passport = require('passport');
const mongoose = require('mongoose');
const serialize = require('serialize-javascript');

const User = mongoose.model('user');

exports = module.exports = app => {
    app.get('/auth/facebook',
        passport.authorize('my-facebook'));

    app.get('/auth/facebook/callback',
        passport.authorize('my-facebook'),
        async (req, res) => {
            let profile = req.account;

            let user = await User.findOne({'security.facebookId': profile.id});
            if (user) {
                await req.logIn(user, function (err) {
                    if (err) {
                        res.send(err)
                    }

                    res.redirect('/');
                });
            } else {

                let html = `<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"
          integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" href="/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/stylesheets/navbar-ss.css">
    <link rel="stylesheet" href="/stylesheets/homepage-ss.css">
    <link rel="stylesheet" href="/stylesheets/signuppage-ss.css">
    <link rel="stylesheet" href="/stylesheets/onlineUsers-ss.css">
    <link rel="stylesheet" href="/stylesheets/feed-ss.css">
    <link rel="stylesheet" href="/stylesheets/profilepage-ss.css">
    <link rel="stylesheet" href="/stylesheets/searchbar-ss.css">
    <link rel="stylesheet" href="/stylesheets/loading-dots-ss.css">
    <link rel="stylesheet" href="/stylesheets/accounts-ss.css">
    <title>Pictogram</title></head>
<body style="margin:0">
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
<script>
    window.profile = ${serialize(profile)}
</script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"
        integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"
        integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ"
        crossorigin="anonymous"></script>
<script src="/libs/jquery-3.2.1.js"></script>
<script src="/libs/image-scale.js"></script>
<script type="text/javascript" src="/static/js/main.19ef5c10.js"></script>
</body>
</html>`;

                res.send(html);
            }
        });
};