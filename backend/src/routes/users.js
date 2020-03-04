const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

SECRET = 'so,secret';


module.exports = function(db) {

    /* Register user */
    router.post('/register', (req, res, next) => {
        var reqBody = req.body;

        db.user.create({
            username: reqBody.userName,
            email: reqBody.email,
            password: reqBody.password,
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
        }).catch(err => {
            throw new Error('orm: user creation failed.', err);
        }).then(ret => {
            var registerStatus = 0;

            if (ret == null) {
                registerStatus = -1;

                res.json({
                    'registerStatus': registerStatus
                })
            } else {
                // add favorite categories

                db.liking.create({
                    userId: ret.id,
                    categoryOne: reqBody.categoryOne,
                    categoryTwo: reqBody.categoryTwo,
                    categoryThree: reqBody.categoryThree,
                }).catch(err => {
                    throw new Error('orm: adding likings failed.', err);
                }).then(ret => {
                    res.json({
                        'registerStatus': registerStatus
                    })
                })
            }

        });
    });

    /* Check user login */
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err | !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }

            req.login(user.id, { session: false }, err => {
                if (err) {
                    res.send(err);
                }
            });

            // get favourite genres
            db.liking.findOne({
                where: {
                    id: user.id,
                }
            }).catch(err => {
                throw new Error('finding at login likings failed', err);
            }).then(ret => {

                // generate jwt
                const token = jwt.sign(user.id, SECRET);
                return res.json({
                    'userName': user.userName,
                    'email': user.email,
                    'password': user.password,
                    'firstName': user.firstName,
                    'lastName': user.lastName,
                    'categoryOne': ret.dataValues.categoryOne,
                    'categoryTwo': ret.dataValues.categoryTwo,
                    'categoryThree': ret.dataValues.categoryThree,
                    'token': token,
                });
            });
        })(req, res);
    });

    /* User logout */
    router.post('/logout', (req, res, next) => {
        req.logout();
        res.json({ success: true });
    });

    return router;
}