exports = module.exports = (app) => {
    app.post('/api/update_profile', async (req, res) => {
        let newProfile = req.body;

        req.user.profile.firstName = newProfile.firstnameInput;
        req.user.profile.lastName = newProfile.lastnameInput;
        req.user.accountDetails.contact = newProfile.contactInput;
        req.user.accountDetails.email = newProfile.emailInput;
        req.user.security.email = newProfile.emailInput;
        req.user.profile.username = newProfile.usernameInput;
        req.user.accountDetails.username = newProfile.usernameInput;
        req.user.security.username = newProfile.usernameInput;

        await req.user.save();

        res.redirect('/EditProfile');
    });
};