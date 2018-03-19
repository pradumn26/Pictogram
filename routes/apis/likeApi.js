const mongoose = require('mongoose');

const Post = mongoose.model('post');
const User = mongoose.model('user');

exports = module.exports = (app) => {
    app.get('/api/like_post', async (req, res) => {
        let id = req.query.postId;

        let post = await Post.findById(id);

        req.user.likedPosts.push(post);
        await req.user.save();

        post.likesCount += 1;
        await post.save();

        let output1 = {};
        output1.isLiked = true;

        let user = await User.findById(post._owner.toString());
        let noti = {
            notification: 'liked your post.',
            _owner: req.user._id,
            username: req.user.profile.username,
            owner_profilePhoto: req.user.profile.profilePhoto,
            url: '/post?postId=' + post._id.toString()
        };
        if (user.notifications.length === 20) {
            user.notifications.splice(0, 1);
            user.notifications.push(noti);
        } else {
            user.notifications.push(noti);
        }
        await user.save();

        res.send(Object.assign(post.toObject(), output1));
    });
};