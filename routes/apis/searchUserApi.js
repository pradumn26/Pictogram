const mongoose = require('mongoose');

const User = mongoose.model('user');

exports = module.exports = (app) => {
    app.get('/api/search_users', async (req, res) => {
        let username = req.query.username;

        let users = await User.find({'profile.username': new RegExp(username, 'i')}).select('profile');

        let output = [];

        for (i = 0; i < 20 && i < users.length; i++) {
            output.push(users[i]);
        }

        res.send(output);
    });
};