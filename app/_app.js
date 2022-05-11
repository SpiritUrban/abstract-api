console.time(">> ....  Run!");

import { log } from '../my_modules/staff.js';

const level = './';
import dotenv from 'dotenv';
dotenv.config();

import init from '../app/log/init.js'; //............ logs
import info from '../app/base.js'; //................ show info

// dependencies
import express from 'express';
const app = express();
import path from 'path';
import cors from 'cors'; //............. cors 1
import myCors from './cors.js';//....... cors 2
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import sassMiddleware from 'node-sass-middleware';
import methodOverride from 'method-override';
// connect for running
import passportFile from './passport.js';
import db from './db.js';
import additional from './additional.js';

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '11111111mb' }));
app.use(bodyParser.json({ limit: '11111111mb' }));
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

import staticModule from './static.js';
staticModule(app);

app.set('env', process.env.ENV);
app.use(cors());
app.use(cookieParser());
app.use(methodOverride());
app.use(myCors);
// safe user
app.use(function (req, res, next) {
    if (req.user) {
        req.user = req.user;
        req.user.password = null;
        req.user.email_token = null;
    } else {
        req.user = { isLogged: false }
    };
    next();
});


import routes from '../routes/index.js';
routes(app);







// // Multers disk storage settings
// const multer = require('multer')
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, './uploads/'),
//   filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`)
// })
// // Multer settings
// const upload = multer({storage}).single('file');


// DB Ininializations and system infomation log
// const appSet = require('./controllers/___/app.js')
// appSet.init()

console.timeEnd(">> .... . Ready!");

// module.exports = app;
export default app;


