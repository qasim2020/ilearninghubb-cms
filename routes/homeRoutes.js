const express = require('express');
const router = express.Router();
const requireLogin = require('../modules/authenticate');

router.get("/", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }
    res.redirect("/dashboard")
});

router.get("/dashboard", requireLogin, (req, res) => res.render("home") )

module.exports = router;