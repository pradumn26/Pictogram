const passport = require('passport');

exports = module.exports = app => {
    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {successRedirect: '/'})
    );
};