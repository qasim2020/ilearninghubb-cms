const User = require('../models/User');

exports.programs = async (req, res) => {
    res.render('programs', {
        activeMenu: 'programs',
        userId: req.session.userId,
        userName: req.session.name,
        sidebarCollapsed: req.session.sidebarCollapsed ? req.session.sidebarCollapsed : false,
    });
};