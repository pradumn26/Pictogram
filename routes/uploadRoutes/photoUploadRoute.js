const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const Post = mongoose.model('post');
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
                    postNo: req.user.nextPost
                })
                    .save()
                    .then(
                        (post) => {
                            const newPostEntry = {
                                postNo: req.user.nextPost,
                                _id: post.id,
                                dateCreated: post.dateCreated
                            };
                            req.user.posts.push(newPostEntry);
                            req.user.nextPost = req.user.nextPost + 1;
                            req.user.profile.postsNumber = req.user.profile.postsNumber + 1;
                            req.user.save().then(()=>{res.redirect('/profile')});
                        }
                    );
            }
        });
    });
};