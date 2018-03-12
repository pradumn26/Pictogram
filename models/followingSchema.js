const {Schema} = require('mongoose');

const followingSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, ref: 'user'}
});

exports = module.exports = followingSchema;