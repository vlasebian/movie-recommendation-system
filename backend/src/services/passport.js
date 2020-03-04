/** 
 * Passport configuration file. Implement authentication strategies here. 
 * 
 */

SECRET = 'so,secret';

const passport = require('passport');

const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = (db) => {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
        },
        (userName, password, callback) => {
            return db.user.findOne({
                where: {
                    userName: userName,
                    password: password,
                }
            }).then(ret => {
                //console.log(ret.dataValues);
                if (!ret) return callback(null, false, { message: 'Incorrect username or password' });
                else return callback(null, ret.dataValues, { message: 'Logged in successfully!' });
            });
        }));

    passport.use(new JwtStrategy({
            secretOrKey: SECRET,
            // the token is sent in the header as bearer token
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        (jwtPayload, callback) => {
            // jwtPayload is the id in this case
            db.user.findOne({
                    where: {
                        id: jwtPayload,
                    }
                })
                .then(user => {
                    return callback(null, user);
                })
                .catch(err => {
                    return err;
                });
        }));
}