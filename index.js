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

require('./models/User');
require('./services/passport');
require('./routes/authRoutes/googleAuthRoutes')(app);
require('./routes/authRoutes/facebookAuthRoutes')(app);
require('./routes/authRoutes/localAuthRoutes')(app);
require('./routes/authRoutes/generalAuthRoutes')(app);
require('./routes/uploadRoutes/photoUploadRoute')(app);

const PORT = process.env.NODE_ENV || 4444;
app.listen(PORT, () => {
    console.log(`app is hosted on: ${PORT}`);
});