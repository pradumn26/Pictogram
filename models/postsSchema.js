const {Schema} = require('mongoose');

const postsSchema = new Schema({
    postNo: Number,
    _id: {type: Schema.Types.ObjectId, ref: 'post'},
    dateCreated: Date
});

exports = module.exports = postsSchema;