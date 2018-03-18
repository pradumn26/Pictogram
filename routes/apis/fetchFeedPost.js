const mongoose = require('mongoose');

const Post = mongoose.model('post');

exports = module.exports = (app) => {
    app.get('/api/fetch_feedPost', async (req, res) => {
        let id = req.query.postId;

        let post = await Post.findById(id);
        let output1 = {};
        output1.isLiked = false;
        for (i = 0; i < req.user.likedPosts.length; i++) {
            if (req.user.likedPosts[i]._id.toString() === post._id.toString())
                output1.isLiked = true;
        }

        res.send(Object.assign(post.toObject(), output1));
    });
};