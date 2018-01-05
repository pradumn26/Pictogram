const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');
const strategies = require('../config/strategies');
const User = mongoose.model('user');

passport.serializeUser(
    (user, done) => {
        done(null, user.id);
    }
);
passport.deserializeUser(
    (id, done) => {
        User.findById(id).then(
            (user) => {
                done(null, user);
            }
        )
    }
);
passport.use(
    new GoogleStrategy({
            clientID: keys.googleAuthClientID,
            clientSecret: keys.googleAuthClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({'security.googleId': profile.id})
                .then(
                    (user) => {
                        if (!user) {
                            new User({
                                security: {
                                    googleId: profile.id,
                                    strategy: 'google',
                                    email: profile.emails[0].value
                                },
                                profile: {
                                    firstName: profile.displayName.split(' ')[0],
                                    lastName: profile.displayName.split(' ')[1],
                                    profilePhoto: profile.photos[0].value,
                                    gender: profile.gender
                                },
                                accountDetails: {
                                    email: profile.emails[0].value,
                                    isVerified: true
                                }
                            })
                                .save()
                                .then(
                                    (newUser) => {
                                        done(null, newUser)
                                    }
                                );
                        }
                        else
                            done(null, user);
                    }
                );
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebookAuthClientID,
            clientSecret: keys.facebookAuthClientSecret,
            callbackURL: '/auth/facebook/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({'security.facebookId': profile.id})
                .then(
                    (user) => {
                        if (user) {
                            done(null, user);
                        } else {
                            new User({
                                profile: {
                                    firstName: profile.displayName.split(' ')[0],
                                    lastName: profile.displayName.split(' ')[1]
                                },
                                security: {
                                    facebookId: profile.id,
                                    strategy: 'facebook'
                                },
                                accountDetails: {
                                    isVerified: true
                                }
                            }).save()
                                .then(
                                    (newUser) => {
                                        done(null, newUser);
                                    }
                                )
                        }
                    }
                );
        }
    )
);

passport.use(
    new LocalStrategy(
        (username, password, done) => {
            User.findOne({'security.username': username, 'security.password': password})
                .then(
                    (user) => {
                        if (user) {
                            done(null, user);
                        } else {
                            done(null, false, {message: 'invalid username or password'});
                        }
                    }
                )
        }
    )
);