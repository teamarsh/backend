
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    FacebookStrategy = require('passport-facebook').Strategy;
const opts = {}
const User = require('../models/UserModels');
const configAuth = require('./Auth')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SuperSecRetKey';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

module.exports = passport => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({email: jwt_payload.email}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL
    }, 
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(() => {
            User.findOne({'facebook.id': profile.id}, (err, user) => {
                if(err)
                    return done(err)
                if(user)
                    return done(null, user)
                else {
                    const newUser = new User()
                    newUser.facebook.id = profile.id,
                    newUser.facebook.token = accessToken,
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
                    newUser.facebook.email = profile.emails[0].value

                    newUser.save((err) => {
                        if(err)
                            throw err
                        return done(null, newUser)
                    })
                }
            })
        })
    }
    ));
}