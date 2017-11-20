const passport = require('passport');

exports = module.exports = app => {
    app.get('/auth/google',
        passport.authenticate('google',
            {scope: ['profile', 'email']}
        )
    );

    app.get('/auth/google/callback', passport.authenticate('google'));
};