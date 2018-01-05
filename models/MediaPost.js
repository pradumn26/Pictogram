const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = require('./Comments');

const postSchema = new Schema({
    url: String,
    likesCount: {type: Number, default: 0},
    comments: [commentSchema],
    postCreated: {type: Date, default: new Date()}
});

mongoose.model('post', postSchema);