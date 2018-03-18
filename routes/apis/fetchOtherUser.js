const mongoose = require('mongoose');

const User = mongoose.model('user');

exports = module.exports = (app) => {
    app.get('/api/fetchOtherUser', async (req, res) => {
        let username = req.query.username;

        let user = await User.findOne({'profile.username': username});

        if (!user) {
            res.send({user: false});
        } else {
            let output = {};
            output.user = true;
            output.profile = user.profile;

            output.isFollowing = false;
            for (i = 0; i < req.user.followingList.length; i++) {
                if (req.user.followingList[i]._id.toString() === user._id.toString())
                    output.isFollowing = true;
            }

            res.send(output);
        }
    });
};