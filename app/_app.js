console.time(">> ....  Run!");

import { log } from '../my_modules/staff.js';

const level = './';
import SETTINGS from '../SETTINGS.js';
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
import passportFile from './passport.js';


if (SETTINGS.IS_SUPER_SERVER) {
    // require('./living-processes/super/satellite-monitor.js'); //... living-processes
    // require('./living-processes/super/super-task-executor.js'); //... living-processes
};

if (SETTINGS.IS_SATELLITE) {
    // require('./living-processes/task-executor.js'); //............. living-processes
    // require('./living-processes/speaker-monitor.js'); //........... living-processes
    // require('./external-connections/assistants-hub.js'); //........... connect
};

import mongoose from 'mongoose';
mongoose.connect(`mongodb+srv://user:${process.env.DB_PASS}@cluster0-bpnma.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    // require('mongoose').connect('mongodb://localhost/', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => log('\n DB Connected!'.info))
    .catch(err => log(`DB Connection Error: ${err.message}`));

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

app
    .use(cookieParser())
    .use(bodyParser.urlencoded({ extended: true, limit: '11111111mb' }))
    .use(bodyParser.json({ limit: '11111111mb' }))
    .use(session({
        secret: 'my_precious',
        name: 'cookie_name',
        //store: sessionStore, // connect-mongo session store
        proxy: true,
        resave: true,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session());

import staticModule from './static.js';
staticModule(app);

app.set('env', process.env.ENV)
    .use(cors())
    .use(cookieParser())
    .use(methodOverride())
    .use(myCors)
    // safe user
    .use(function (req, res, next) {
        if (req.user) {
            req.user = req.user;
            req.user.password = null;
            req.user.email_token = null;
        } else {
            req.user = { isLogged: false }
        }
        next()
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


