const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* Register user */
router.post('/register', async (req, res, next) => {
    let preferences = [
        req.body.categoryOne,
        req.body.categoryTwo,
        req.body.categoryThree,
    ];

    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        preferences: preferences,
    });

    await newUser.save(function (err) {
        if (err) {
            next(err);
        }

        res.status(200).json({ success: true });
    });
});

/* Check user login */
router.post('/login', async (req, res, next) => {
    let user = await User.findOne({
            username: req.body.username,
            password: req.body.password,
        });

    if (!user) {
        res.status(403);
        res.json({ success: false });
    } else {
        res.status(200).json({
            'uid': user._id,
            'username': user.username,
            'email': user.email,
            'firstname': user.firstName,
            'lastname': user.lastName,
            'categoryOne': user.preferences[0],
            'categoryTwo': user.preferences[1],
            'categoryThree': user.preferences[2],
        });
    }
});

/* User logout */
router.post('/logout', async (req, res, next) => {
    res.status(200).json({ success: true });
});

module.exports = router;