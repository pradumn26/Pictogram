const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('user');

exports = module.exports = app => {
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/'
        })
    );

    app.post('/signUp', async (req, res) => {
        let newUser = req.body;

        const emailRes = await User.find({'security.email': newUser.email}).select({media: false}).exec();
        const usernameRes = await User.find({'security.username': newUser.username}).select({media: false}).exec();

        if (emailRes.length===0 && usernameRes.length===0) {
            new User({
                profile: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    gender: newUser.gender
                },
                accountDetails: {
                    email: newUser.email,
                    username: newUser.username,
                    contact: newUser.contact,
                    isVerified: true
                },
                security: {
                    email: newUser.email,
                    username: newUser.username,
                    password: newUser.password
                },
                verificationSession: {
                    verificationCode: Math.floor(Math.random() * (999999 - 100000)) + 100000
                }
            }).save().then(
                (user) => {
                    req.login(user, (err) => {
                        if(err)
                            return console.log(err);

                        res.send({isValid: true})
                    });
                }
            );
        } else {
            let output = {};
            output.isValid = false;
            emailRes.length>0 ? output.email = 'Account associated with the given email already exists' : output.email = true;
            usernameRes.length>0 ? output.username = 'Account associated with the given username already exists' : output.username = true;
            res.send(output);
        }
    });
};