const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const Post = mongoose.model('post');
const User = mongoose.model('user');
const {currentDomain} = require('../../config/keys');

exports = module.exports = (app) => {
    const storage = multer.diskStorage({
        destination: path.resolve('./public/uploads'),
        filename: function (req, file, cb) {
            cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage
    }).single('myImage');

    app.post('/upload', (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                console.log(err);
                res.redirect('/profile');
            }
            else {
                new Post({
                    url: currentDomain + '/uploads/' + req.file.filename,
                    postNo: req.user.nextPost,
                    _owner: req.user._id,
                    owner_profilePhoto: req.user.profile.profilePhoto,
                    username: req.user.profile.username,
                    owner_fullname: req.user.profile.firstName + ' ' + req.user.profile.lastName
                }).save().then((post) => {
                    let newPostEntry = {
                        postNo: req.user.nextPost,
                        _id: post.id,
                        dateCreated: post.dateCreated
                    };
                    req.user.posts.push(newPostEntry);
                    req.user.nextPost = req.user.nextPost + 1;
                    req.user.profile.postsNumber = req.user.profile.postsNumber + 1;
                    req.user.save().then(() => {
                        res.redirect('/profile')
                    });

                    if (req.user.followersList.length > 0) {
                        newPostEntry._owner = req.user._id;
                        let followerIds = [];
                        req.user.followersList.map((follower) => {
                            followerIds.push(follower._id);
                        });
                        User.where('_id').in(followerIds).exec()
                            .then((followers) => {
                                followers.map((follower) => {
                                    follower.feed.push(newPostEntry);
                                    follower.save();
                                });
                            });
                    }
                });
            }
        });
    });
};