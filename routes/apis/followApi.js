const mongoose = require('mongoose');

const User = mongoose.model('user');

exports = module.exports = (app) => {
    app.get('/api/followUser', async (req, res) => {
        let username = req.query.username;

        let user = await User.findOne({'profile.username': username});

        req.user.followingList.push(user);
        req.user.profile.followingNumber = req.user.profile.followingNumber + 1;
        let postNo = user.nextPost - 1;
        console.log(postNo);
        if (postNo === 1) {
            let post1 = user.posts[0];
            post1._owner = user._id;
            req.user.feed.push(post1);
        } else if (postNo > 1) {
            let post1, post2;
            for (i = 0; i < user.posts.length; i++) {
                if (user.posts[i].postNo === postNo)
                    post2 = user.posts[i];
                if (user.posts[i].postNo === postNo - 1)
                    post1 = user.posts[i];

                if(post1 && post2)
                    break;
            }
            console.log(post1, post2);
            post1._owner = user._id;
            post2._owner = user._id;
            req.user.feed.push(post1);
            req.user.feed.push(post2);
        }
        try {
            await req.user.save();
        } catch (err) {
            console.log(err);
        }

        user.followersList.push(req.user);
        user.profile.followersNumber = user.profile.followersNumber + 1;
        try {
            await user.save();
        } catch (err) {
            console.log(err);
        }

        res.redirect('/user/'+username);
    });
};