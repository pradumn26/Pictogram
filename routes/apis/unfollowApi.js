const mongoose = require('mongoose');

const User = mongoose.model('user');

exports = module.exports = (app) => {
    app.get('/api/unfollowUser', async (req, res) => {
        let username = req.query.username;

        let user = await User.findOne({'profile.username': username});

        for (i = 0; i < req.user.followingList.length; i++) {
            if (req.user.followingList[i]._id.toString() === user._id.toString()) {
                req.user.followingList.splice(i, 1);
                break;
            }
        }
        req.user.profile.followingNumber = req.user.profile.followingNumber - 1;
        for (i = 0; i < req.user.feed.length; i++) {
            if (req.user.feed[i]._owner.toString() === user._id.toString()) {
                req.user.feed.splice(i, 1);
                --i;
            }
        }
        try {
            await req.user.save();
        } catch (err) {
            console.log(err);
        }

        for (i = 0; i < user.followersList.length; i++) {
            if (user.followersList[i]._id.toString() === req.user._id.toString()) {
                user.followersList.splice(i, 1);
                break;
            }
        }
        user.profile.followersNumber = user.profile.followersNumber - 1;
        try {
            await user.save();
        } catch (err) {
            console.log(err);
        }

        res.redirect('/user/' + username);
    });
};