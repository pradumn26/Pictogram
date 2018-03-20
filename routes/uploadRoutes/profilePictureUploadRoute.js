const multer = require('multer');
const path = require('path');

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
    }).single('editProfileImageUpload');

    app.post('/upload_profilePicture', (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                console.log(err);
                res.redirect('/EditProfile');
            }
            else {
                req.user.profile.profilePhoto = currentDomain + '/uploads/' + req.file.filename;
                req.user.save().then(() => {
                    res.redirect('/EditProfile');
                });
            }
        });
    });
};