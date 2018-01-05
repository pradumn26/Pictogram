const {Schema} = require('mongoose');

const commentSchema = new Schema({
    content: String,
    likesCount: {type: Number, default: 0}
});

exports = module.exports = commentSchema;