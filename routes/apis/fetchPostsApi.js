const mongoose = require('mongoose');

const Post = mongoose.model('post');

exports = module.exports = (app) => {
    app.get('/api/fetch_posts', async (req, res) => {
        let postNo = req.query.postNo;
        if(postNo == 0)
            postNo = req.user.nextPost-1;

        let nextPostsIds = [];
        for (i = 0; i < req.user.posts.length && nextPostsIds.length < 9; i++) {
            if(req.user.posts[i].postNo == postNo ||
               req.user.posts[i].postNo == (postNo-1) ||
               req.user.posts[i].postNo == (postNo-2) ||
               req.user.posts[i].postNo == (postNo-3) ||
               req.user.posts[i].postNo == (postNo-4) ||
               req.user.posts[i].postNo == (postNo-5) ||
               req.user.posts[i].postNo == (postNo-6) ||
               req.user.posts[i].postNo == (postNo-7) ||
               req.user.posts[i].postNo == (postNo-8)) {

                nextPostsIds.push(req.user.posts[i]._id);
            }
        }

        let nextPosts = await Post.where('_id').in(nextPostsIds).sort('postNo').exec();

        let output = {};
        if(nextPosts.length === 0) {
            output.hasMore = false;
        } else {
            output.nextPosts = nextPosts.reverse();
            if(postNo - 9 > 0) {
                output.hasMore = true;
                output.postNo = (postNo - 9)
            } else {
                output.hasMore = false;
            }
        }

        res.send(output);
    });
};