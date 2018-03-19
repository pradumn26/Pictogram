exports = module.exports = (app) => {
    app.get('/api/fetch_notifications', (req, res) => {
        res.send(req.user.notifications.reverse());
    });
};