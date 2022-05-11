const level = './';

// measuring
console.time('app startup time');

// env
import dotenv from 'dotenv';
dotenv.config();
// dependencies
import { log } from '../my_modules/staff.js';
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
import multer from './multer.js';
import init from '../app/log/init.js'; //............ logs
import info from '../app/base.js'; //................ show info

app.set('env', process.env.ENV);

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

// static folders
import staticModule from './static.js';
staticModule(app);

// cors
app.use(cors());
app.use(myCors);

app.use(cookieParser());
app.use(methodOverride());

// safe user
import safeUser from './safe-user';
safeUser(app);

// measuring
console.timeLog('app startup time');
log('main');

// routes
import routes from '../routes/index.js';
routes(app);

// measuring
console.timeEnd('app startup time');
log('end');

export default app;