const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    facebookId: String,
    googleId: String,
    strategy: String
});

mongoose.model('user', UserSchema);