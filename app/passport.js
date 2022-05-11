// .env
// require('dotenv').config()
import dotenv from 'dotenv';


const level = '../';
// const SETTINGS = require(`${level}SETTINGS.js`);
import SETTINGS from '../SETTINGS.js';

// const { log, pro, lex, rand_str_long } = require(`${level}my_modules/staff`);
import { log,  rand_str_long } from '../my_modules/staff.js';

// const { User } = require(`${level}models`);
// const { crypto } = require(`${level}services`);
import { User } from '../models/index.js';
import { crypto } from '../services/index.js';


import moment from 'moment';


import passport from 'passport';

import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

// var FacebookStrategy = require('passport-facebook').Strategy;
// var TwitterStrategy = require('passport-twitter').Strategy;
// var GithubStrategy = require('passport-github2').Strategy;
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
// var InstagramStrategy = require('passport-instagram').Strategy;

//
// serialize and deserialize
//
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        (!err) ? done(null, user) : done(err, null);
    });
});

//
// createOrUpdateUser(strategy, profile, done)
//
async function createOrUpdateUser(strategy, profile, done) {
    var user = null;
    if (strategy == 'google') {
        const email = profile.emails[0].value;
        user = await User.findOneAndUpdate({ email }, {
            google: {
                id: profile.id,
                userName: profile.displayName,
                email: email,
            }
        });
    };
    if (strategy == 'facebook') {
        const email = (profile.email) ? profile.email : '';
        user = await User.findOneAndUpdate({ email }, {
            facebook: {
                id: profile.id,
                userName: profile.displayName,
                email: email
            }
        });
    };
    if (!user) createUser(strategy, profile, done);
    else {
        done(null, user);
    };
};

//
// createUser(strategy, profile, done)
//
async function createUser(strategy, profile, done) {
    const newUser = new User({
        username: profile.displayName,
        created: Date.now(),
        wallets: {
            USD: {
                balance: 0
            }
        }
    });
    if (strategy == 'google') {
        const email = profile.emails[0].value;
        newUser.email = email;
        newUser.google = {
            id: profile.id,
            username: profile.displayName,
            email: email,
        };
    };
    if (strategy == 'facebook') {
        const email = (profile.email) ? profile.email : '';
        newUser.email = email;
        newUser.facebook = {
            id: profile.id,
            username: profile.displayName,
            email: email
        };
    };
    await newUser.save();
    done(null, newUser);
}


//
// LocalStrategy
//
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // 1. update token
        const passwordHash = crypto.hash(password + '');
        const auth_token = rand_str_long();
        const user = await User.findOneAndUpdate({ email }, { auth_token });
        (user) ? user.auth_token = auth_token : '';
        // 2. set auto logout time for admins, update last login time
        const isAdmin = SETTINGS.ADMIN_ROLES.some(role => role == user.role);  // ..................... boolean
        const now = moment();
        const last_login = moment()
            .toDate();
        const shouldLogout = moment(now)
            .add(SETTINGS.ADMIN_SESSION_DURATION.AMOUNT, SETTINGS.ADMIN_SESSION_DURATION.UNITS)
            .toDate();
        const update = { last_login };
        if (isAdmin) update.shouldLogout = shouldLogout;
        if (!isAdmin) update.shouldLogout = '';
        // 3. update
        await User.findOneAndUpdate({ email }, update);
        // 4. next
        return (user) ?
            (passwordHash === user.password) ?
                done(null, user) :
                done(null, false, { message: 'Incorrect password.' }) :
            done(null, false, { message: 'Incorrect email.' });
    } catch (err) {
        log('!!! Some error in LocalStrategy !!!');
        done(err);
    }
}));

// //
// // GoogleStrategy
// //
// passport.use(new GoogleStrategy({
//     clientID: process.env.GP_ID, //'706111676047-g5j86f7ipga7ant19ii0shaltrooac36.apps.googleusercontent.com',
//     clientSecret: process.env.GP_KEY, //'IdHthb-IWhRRyGtl1K5dNd38',
//     callbackURL: process.env.GP_CLB, //'http://r4.okm.pub:3600/auth/google/callback'
//     passReqToCallback: true
// },
//     async (request, accessToken, refreshToken, profile, done) => {
//         try {
//             log('google profile: '.info, profile);
//             const user = await User.findOne({ 'google.id': profile.id });
//             (user) ? done(null, user) : createOrUpdateUser('google', profile, done);
//         } catch (error) {
//             log(error);
//         };
//     }
// ));


// //
// // FacebookStrategy
// //
// // module.exports = 
// export default passport.use(new FacebookStrategy({
//     clientID: process.env.FB_ID, // '455174914848353',
//     clientSecret: process.env.FB_KEY, //'30a983716bd55cf5f36e1626fe3b20b8',
//     callbackURL: process.env.FB_CLB, // 'http://r4.okm.pub:3600/auth/facebook/callback'
//     profileFields: ['id', 'displayName', 'link', 'email', 'name', 'picture.type(large)']
//     // passReqToCallback : true,
// },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             log('facebook profile: '.info, profile);
//             const user = await User.findOne({ 'facebook.id': profile.id });
//             (user) ? done(null, user) : createOrUpdateUser('facebook', profile, done);
//         } catch (error) {
//             log(error);
//         }
//     }
// ));


// passport.use(new TwitterStrategy({
//     consumerKey: 'get_your_own',
//     consumerSecret: 'get_your_own',
//     callbackURL: "http://127.0.0.1:3600/auth/twitter/callback"
// },
//     function (accessToken, refreshToken, profile, done) {
//         User.findOne({ oauthID: profile.id }, function (err, user) {
//             if (err) {
//                 console.log(err); // handle errors!
//             }
//             if (!err && user !== null) {
//                 done(null, user);
//             } else {
//                 user = new User({
//                     oauthID: profile.id,
//                     name: profile.displayName,
//                     created: Date.now()
//                 });
//                 user.save(function (err) {
//                     if (err) {
//                         console.log(err); // handle errors!
//                     } else {
//                         console.log("saving user ...");
//                         done(null, user);
//                     }
//                 });
//             }
//         });
//     }
// ));



// passport.use(new GithubStrategy({
//     clientID: 'get_your_own',
//     clientSecret: 'get_your_own',
//     callbackURL: "http://127.0.0.1:3600/auth/github/callback"
// },
//     function (accessToken, refreshToken, profile, done) {
//         User.findOne({ oauthID: profile.id }, function (err, user) {
//             if (err) {
//                 console.log(err); // handle errors!
//             }
//             if (!err && user !== null) {
//                 done(null, user);
//             } else {
//                 user = new User({
//                     oauthID: profile.id,
//                     name: profile.displayName,
//                     created: Date.now()
//                 });
//                 user.save(function (err) {
//                     if (err) {
//                         console.log(err); // handle errors!
//                     } else {
//                         console.log("saving user ...");
//                         done(null, user);
//                     }
//                 });
//             }
//         });
//     }
// ));



// passport.use(new InstagramStrategy({
//     clientID: 'get_your_own',
//     clientSecret: 'get_your_own',
//     callbackURL: 'http://127.0.0.1:3600/auth/instagram/callback'
// },
//     function (accessToken, refreshToken, profile, done) {
//         User.findOne({ oauthID: profile.id }, function (err, user) {
//             if (err) {
//                 console.log(err); // handle errors!
//             }
//             if (!err && user !== null) {
//                 done(null, user);
//             } else {
//                 user = new User({
//                     oauthID: profile.id,
//                     name: profile.displayName,
//                     created: Date.now()
//                 });
//                 user.save(function (err) {
//                     if (err) {
//                         console.log(err); // handle errors!
//                     } else {
//                         console.log("saving user ...");
//                         done(null, user);
//                     }
//                 });
//             }
//         });
//     }
// )
// );

export default null;