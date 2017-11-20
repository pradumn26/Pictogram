exports = module.exports = app => {
    app.get('/auth/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    );

    app.get('/auth/current_user',
        (req, res) => {
            res.send(req.user);
        }
    );
};