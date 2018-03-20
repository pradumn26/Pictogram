exports = module.exports = (app) => {
    app.get('/api/fetch_accountDetails', (req, res) => {
        if (!req.user)
            res.send(null);

        let output = {};
        output.profile = req.user.profile;
        output.accountDetails = req.user.accountDetails;
        res.send(output);
    });
};