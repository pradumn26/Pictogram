const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = require('./Comments');

const postSchema = new Schema({
    postNo: Number,
    url: String,
    likesCount: {type: Number, default: 0},
    comments: [commentSchema],
    dateCreated: {type: Date, default: new Date()}
});

mongoose.model('post', postSchema);