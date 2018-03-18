const mongoose = require('mongoose');

const Post = mongoose.model('post');

exports = module.exports = (app) => {
    app.get('/api/unlike_post', async (req, res) => {
        let id = req.query.postId;

        let post = await Post.findById(id);

        for (i = 0; i < req.user.likedPosts.length; i++) {
            if(req.user.likedPosts[i]._id.toString() === post._id.toString()) {
                req.user.likedPosts.splice(i, 1);
                break;
            }
        }
        await req.user.save();

        post.likesCount -= 1;
        await post.save();

        let output1 = {};
        output1.isLiked = false;
        res.send(Object.assign(post.toObject(), output1));
    });
};