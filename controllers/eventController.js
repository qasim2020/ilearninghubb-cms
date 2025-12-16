const User = require('../models/User');

exports.events = async (req, res) => {
    res.render('events', {
        userId: req.session.userId,
        userName: req.session.name,
        sidebarCollapsed: req.session.sidebarCollapsed ? req.session.sidebarCollapsed : false,
    });
};