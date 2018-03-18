const mongoose = require('mongoose');

const Post = mongoose.model('post');

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
        res.send(Object.assign(post.toObject(), output1));
    });
};