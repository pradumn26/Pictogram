const mongoose = require('mongoose');

const User = mongoose.model('user');

exports = module.exports = app => {
    app.get('/auth/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    );

    app.get('/auth/current_user',
        (req, res) => {
            if (req.user)
                res.send(req.user.profile);
            else
                res.send(null);
        }
    );

    app.post('/oauthSignUp',
        (req, res) => {
            let profile = req.body;

            if (profile.provider === 'facebook') {
                new User({
                    profile: {
                        firstName: profile.displayName.split(' ')[0],
                        lastName: profile.displayName.split(' ')[1],
                        username: profile.username
                    },
                    security: {
                        facebookId: profile.id,
                        strategy: 'facebook',
                        username: profile.username
                    },
                    accountDetails: {
                        isVerified: true,
                        username: profile.username
                    }
                }).save()
                    .then((newUser) => {
                        req.logIn(newUser, (err) => {
                           if(err)
                               return console.log(err);

                            res.send({saved: true});
                        });
                    });
            } else if (profile.provider === 'google') {
                new User({
                    security: {
                        googleId: profile.id,
                        strategy: 'google',
                        email: profile.emails[0].value,
                        username: profile.username
                    },
                    profile: {
                        firstName: profile.displayName.split(' ')[0],
                        lastName: profile.displayName.split(' ')[1],
                        profilePhoto: profile.photos[0].value,
                        gender: profile.gender,
                        username: profile.username
                    },
                    accountDetails: {
                        email: profile.emails[0].value,
                        isVerified: true,
                        username: profile.username
                    }
                }).save()
                    .then((newUser) => {
                        req.logIn(newUser, (err) => {
                            if(err)
                                return console.log(err);

                            res.send({saved: true});
                        });
                    });
            }
        });
};