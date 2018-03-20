const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieSession({
    maxAge: 30*24*3600*1000,
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.static('client/build'));

require('./models/User');
require('./models/MediaPost');
require('./services/passport');
require('./routes/authRoutes/googleAuthRoutes')(app);
require('./routes/authRoutes/facebookAuthRoutes')(app);
require('./routes/authRoutes/localAuthRoutes')(app);
require('./routes/authRoutes/generalAuthRoutes')(app);
require('./routes/uploadRoutes/photoUploadRoute')(app);
require('./routes/apis/fetchPostsApi')(app);
require('./routes/apis/checkUsernameApi')(app);
require('./routes/apis/searchUserApi')(app);
require('./routes/apis/fetchOtherUser')(app);
require('./routes/apis/fetchOtherUserPostsApi')(app);
require('./routes/apis/followApi')(app);
require('./routes/apis/unfollowApi')(app);
require('./routes/apis/fetchFeed')(app);
require('./routes/apis/fetchFeedPost')(app);
require('./routes/apis/likeApi')(app);
require('./routes/apis/unlikeApi')(app);
require('./routes/apis/addCommentApi')(app);
require('./routes/apis/havePosts')(app);
require('./routes/apis/fetchNotificationsApi')(app);
require('./routes/apis/markNotiAsReadApi')(app);
require('./routes/apis/fetchAccountDetails')(app);
require('./routes/uploadRoutes/profilePictureUploadRoute')(app);
require('./routes/apis/updateProfile')(app);

const PORT = process.env.NODE_ENV || 4444;
app.listen(PORT, () => {
    console.log(`app is hosted on: ${PORT}`);
});