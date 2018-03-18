exports = module.exports = (app) => {
    app.get('/api/havePosts', (req, res) => {
        if (req.user.posts.length > 0)
            res.send({havePosts: true});
        else
            res.send({havePosts: false});
    });
};