const passport = require('passport');
const path = require('path');

exports = module.exports = app => {
    app.get('/auth/local',
        (req, res) => {
            res.sendFile(path.resolve('loginformtrial.html'));
        }
    );

    app.post('/login',
        passport.authenticate('local', {successRedirect: '/'})
    );
};