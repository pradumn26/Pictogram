exports = module.exports = (app) => {
    app.get('/api/markNotiAsRead', (req, res) => {
       let id = req.query.id;

       for(i = 0; i < req.user.notifications.length; i++) {
           if(req.user.notifications[i]._id.toString() === id) {
               req.user.notifications[i].isRead = true;
               req.user.save();
               break;
           }
       }
    });
};