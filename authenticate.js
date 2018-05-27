var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Customer = require('./models/customers');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');

exports.local = passport.use(new LocalStrategy(Customer.authenticate()));
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());

exports.getToken = function(customer) {
    return jwt.sign(customer, config.secretKey,
        {expiresIn: 7200});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        Customer.findOne({_id: jwt_payload._id}, (err, Customer) => {
            if (err) {
                return done(err, false);
            }
            else if (Customer) {
                return done(null, Customer);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});