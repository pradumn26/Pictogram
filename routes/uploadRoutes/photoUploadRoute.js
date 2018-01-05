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
            if(err) {
                console.log(err);
                res.redirect('/profile');
            }
            else {
                new Post({url: currentDomain + '/uploads/' + file.filename})
                    .save().then(() => {res.redirect('/profile')});
            }
        });
    });
};