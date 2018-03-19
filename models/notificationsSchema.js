const {Schema} = require('mongoose');

const notificationsSchema = new Schema({
    _owner: {type: Schema.Types.ObjectId, ref: 'user'},
    username: String,
    owner_profilePhoto: String,
    notification: String,
    url: String,
    isRead: {type: Boolean, default: false}
});

exports = module.exports = notificationsSchema;