const mongoose = require('mongoose');

const Post = mongoose.model('post');

exports = module.exports = (app) => {
    app.post('/api/add_comment', async (req, res) => {
        let id = req.query.postId;

        let post = await Post.findById(id);

        post.comments.push(req.body);
        await post.save();

        res.send(post.toObject());
    });
};