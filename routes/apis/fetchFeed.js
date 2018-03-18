const mongoose = require('mongoose');

const Post = mongoose.model('post');

exports = module.exports = (app) => {
    app.get('/api/fetch_feed', (req, res) => {
        if (req.user.feed.length === 0)
            res.send({noFeed: true});

        let currentPosition = +req.query.currentPosition;

        let i;
        if (currentPosition === -1)
            i = req.user.feed.length - 1;
        else
            i = currentPosition;

        if (i - 9 <= 0) {
            let output = {};
            output.posts = req.user.feed.slice(0, i + 1).reverse();
            output.hasMore = false;
            res.send(output);
        } else {
            let output = {};
            output.posts = req.user.feed.slice(i - 9, i + 1).reverse();
            output.hasMore = true;
            output.currentPosition = i - 10;
            res.send(output);
        }
    });
};