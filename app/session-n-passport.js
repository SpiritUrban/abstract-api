import passport from 'passport';
import session from 'express-session';

//
// session n passport
//
export default function (app) {
    app.use(session({
        secret: 'my_precious',
        name: 'cookie_name',
        //store: sessionStore, // connect-mongo session store
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};