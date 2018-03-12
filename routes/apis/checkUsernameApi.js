const mongoose = require('mongoose');

const User = mongoose.model('user');

exports = module.exports = (app) => {
    app.get('/api/check_username', async (req, res) => {
        let username = req.query.username;

        let oldUser = await User.findOne({'security.username': username});

        if(oldUser) {
            res.send({available: false});
        } else {
            res.send({available: true});
        }
    });
};