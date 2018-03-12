const mongoose = require('mongoose');

const Post = mongoose.model('post');
const User = mongoose.model('user');

exports = module.exports = (app) => {
    app.get('/api/fetch_otheruser_posts', async (req, res) => {
        let postNo = req.query.postNo;
        let username = req.query.username;

        let user = await User.findOne({'profile.username': username});

        if(postNo == 0)
            postNo = user.nextPost-1;

        let nextPostsIds = [];
        for (i = 0; i < user.posts.length && nextPostsIds.length < 9; i++) {
            if(user.posts[i].postNo == postNo ||
                user.posts[i].postNo == (postNo-1) ||
                user.posts[i].postNo == (postNo-2) ||
                user.posts[i].postNo == (postNo-3) ||
                user.posts[i].postNo == (postNo-4) ||
                user.posts[i].postNo == (postNo-5) ||
                user.posts[i].postNo == (postNo-6) ||
                user.posts[i].postNo == (postNo-7) ||
                user.posts[i].postNo == (postNo-8)) {

                nextPostsIds.push(user.posts[i]._id);
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