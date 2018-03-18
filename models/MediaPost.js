const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = require('./Comments');
const followersSchema = require('./followersSchema');

const postSchema = new Schema({
    postNo: Number,
    url: String,
    likesCount: {type: Number, default: 0},
    comments: [commentSchema],
    dateCreated: {type: Date, default: new Date()},
    _owner: {type: Schema.Types.ObjectId, ref: 'user'},
    owner_profilePhoto: String,
    username: String,
    owner_fullname: String
});

mongoose.model('post', postSchema);