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
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id})
            .then(
                (user) => {
                    if (!user) {
                        new User({googleId: profile.id, strategy: strategies.google})
                            .save()
                            .then(
                                (newUser) => {
                                    done(null, newUser)
                                }
                            );
                    }

                    done(null, user);
                }
            );
    })
);

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebookAuthClientID,
            clientSecret: keys.facebookAuthClientSecret,
            callbackURL: '/auth/facebook/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({facebookId: profile.id})
                .then(
                    (user) => {
                        if(user) {
                            done(null, user);
                        } else {
                            new User({facebookId: profile.id, strategy: strategies.facebook}).save()
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
            User.findOne({username, password})
                .then(
                    (user) => {
                        if(user) {
                            done(null, user);
                        } else {
                            done(null, false);
                        }
                    }
                )
        }
    )
);