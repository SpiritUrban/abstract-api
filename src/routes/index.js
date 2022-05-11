import express from 'express';
const router = express.Router();

import prepare from './api/v1/prepare.js';
import authStrategies from './api/v1/auth-strategies.js';
import dev from './api/v1/dev.js';
import auth from './api/v1/auth.js';
// import admin from './api/v1/admin.js';
import final from './api/v1/final.js' ;

export default function (app) {
    app.use(router);
    app.use('/', prepare);
    app.use('/', authStrategies);
    app.use('/', dev);
    app.use('/api/auth', auth);
    // app.use('/api/admin', admin);
    app.use('/', final);
};