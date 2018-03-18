const {Schema} = require('mongoose');

const commentSchema = new Schema({
    content: String,
    username: String
});

exports = module.exports = commentSchema;