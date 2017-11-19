const passport = require('passport');

exports = module.exports = app => {
    app.get('/auth/google',
        passport.authenticate('google',
            {scope: ['email', 'profile']}
        )
    );
};