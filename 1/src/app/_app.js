const level = './';

// measuring
console.time('app startup time');

// env
import dotenv from 'dotenv';
dotenv.config();

// dependencies
import { log } from '../my_modules/staff.js';

// ???
import path from 'path';

// connect for running
import db from './db.js';
import init from './log/init.js'; //............ logs
import info from './base.js';     //............ show info
import multer from './multer.js';
import additional from './additional.js';
import passportFile from './passport.js';

// app
import express from 'express';
const app = express();

// env
app.set('env', process.env.ENV);

// parsers
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '11111111mb' }));
app.use(bodyParser.json({ limit: '11111111mb' }));

// session n passport
import snp from './session-n-passport.js';
snp(app);

// static folders
import staticModule from './static.js';
// staticModule(app);

// cors
import cors from 'cors'; //............. cors 1
import myCors from './cors.js';//....... cors 2
app.use(cors());
app.use(myCors);

// safe user
import safeUser from './safe-user.js';
safeUser(app);

// measuring
console.timeLog('app startup time');
log('main');

// method override
import methodOverride from 'method-override';
app.use(methodOverride());

// routes
import routes from '../routes/index.js';
routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({y:4});
});

// measuring
console.timeEnd('app startup time');
log('end');

export default app;