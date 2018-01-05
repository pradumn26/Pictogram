exports = module.exports = app => {
    app.get('/auth/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    );

    app.get('/auth/current_user',
        (req, res) => {
            if (req.user)
                res.send(req.user.profile);
            else
                res.send(null);
        }
    );
};