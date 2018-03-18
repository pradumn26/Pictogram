const mongoose = require('mongoose');
const {Schema} = mongoose;

const postsSchema = require('./postsSchema');
const followersSchema = require('./followersSchema');
const followingSchema = require('./followingSchema');

const UserSchema = new Schema({
    profile: {
        firstName: String,
        lastName: String,
        username: String,
        // nationality: String,
        // livesIn: String,
        // dob: Date,
        gender: String,
        profilePhoto: String,
        postsNumber: {type: Number, default: 0},
        followersNumber: {type: Number, default: 0},
        followingNumber: {type: Number, default: 0}
    },
    accountDetails: {
        email: String,
        username: String,
        contact: Number,
        isVerified: {type: Boolean, default: false},
        dateOfCreation: {type: Date, default: new Date()}
    },
    security: {
        username: String,
        email: String,
        password: String,
        googleId: String,
        facebookId: String,
        strategy: String
    },
    verificationSession: {
        verificationCode: Number
    },
    posts: [postsSchema],
    followersList: [followersSchema],
    followingList: [followingSchema],
    nextPost: {type: Number, default: 1},
    feed: [postsSchema],
    likedPosts: [postsSchema]
});

mongoose.model('user', UserSchema);