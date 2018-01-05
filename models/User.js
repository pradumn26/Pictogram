const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    profile: {
        firstName: String,
        lastName: String,
        // nationality: String,
        // livesIn: String,
        // dob: Date,
        gender: String,
        profilePhoto: String
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
    }
});

mongoose.model('user', UserSchema);