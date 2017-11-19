const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');

passport.use(
    new GoogleStrategy({
    clientID: keys.googleAuthClientID,
    clientSecret: keys.googleAuthClientSecret,
    callbackURL: '/auth/google/callback'
    }),
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    }
);