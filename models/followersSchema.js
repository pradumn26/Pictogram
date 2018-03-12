const {Schema} = require('mongoose');

const followersSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, ref: 'user'}
});

exports = module.exports = followersSchema;