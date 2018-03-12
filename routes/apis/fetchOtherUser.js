const mongoose = require('mongoose');

const User = mongoose.model('user');

exports = module.exports = (app) => {
    app.get('/api/fetchOtherUser', async (req, res) => {
        let username = req.query.username;

        let user = await User.findOne({'profile.username': username});

        if(!user) {
            res.send({user: false});
        } else {
            let output = {};
            output.user = true;
            output.profile = user.profile;
            res.send(output);
        }
    });
};