const mongoose = require('mongoose');

const Post = mongoose.model('post');

exports = module.exports = (app) => {
    app.get('/api/fetchFeed', async (req, res) => {
        if (req.user.feed.length === 0)
            res.send({noFeed: true});

        let currentPosition = +req.query.currentPosition;

        let i;
        if (currentPosition === -1)
            i = req.user.feed.length - 1;
        else
            i = currentPosition;

        if (i - 9 <= 0) {
            let selectedFeed = req.user.feed.slice(0, currentPosition + 1).reverse();
            let selectedIds = [];
            selectedFeed.map((feed) => {
                selectedIds.push(feed._id)
            });
            let selectedPosts = await Post.where('_id').in(selectedIds);
            let output = {};
            output.hasMore = false;
            output.posts = selectedPosts;
            res.send(output);
        } else {
            let selectedFeed = req.user.feed.slice(i - 9, currentPosition + 1).reverse();
            let selectedIds = [];
            selectedFeed.map((feed) => {
                selectedIds.push(feed._id)
            });
            let selectedPosts = await Post.where('_id').in(selectedIds);
            let output = {};
            output.hasMore = true;
            output.posts = selectedPosts;
            output.currentPosition = i - 10;
            res.send(output);
        }
    });
};