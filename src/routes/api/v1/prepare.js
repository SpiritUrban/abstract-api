const level = '../../../';
import { log,  rand_str_long } from '../../../my_modules/staff.js';
import { url_end } from '../../../my_modules/lib.js';

import { User, Chat } from '../../../models/index.js';
import express from 'express';
const router = express.Router();
 

// INFO
//
router.all('/*', async (req, res, next) => {
    log('Rout: ---> ' + req.url );

    const url = req._parsedUrl.pathname;
    let chatName = url.slice(1, url.length);
    if (chatName == '') chatName = 'root';

    // const chat = await Chat.findOne({ name: chatName })
    // req.chat = chat;

    // let authenticated = req.isAuthenticated()

    let user = {}
    if (req.user) {
        user = req.user
        // res.set({
        //     'user_id': user._id,
        //     'username': user.username
        //   })
        // https://sailsjs.com/documentation/reference/response-res/res-cookie
        res.cookie('user_id', user._id + '', { maxAge: 30000, httpOnly: false })
        res.cookie('username', user.username, {
            maxAge: 30000,
            httpOnly: false,
            hostOnly: false
        })
    };
    next();
});

// FAKE !!!!
//
router.all('/*', async (req, res, next) => {

    // res.json({ok:true});

    console.log('Warning: ---> Fake User activated in prepare.js');
    // log('Auth: ---> Header: token, email: ' + req.headers.auth_token + ', ' + req.headers.email);

    if ((req.headers.origin == 'http://localhost:4200') || (req.headers.origin == 'http://192.168.0.105:4200')) {
        if (req.headers.auth_token !== 'no' && req.headers.auth_token !== undefined) {

            req.user = await User.findOne({ email: req.headers.email });
            // log(`Prepare: auth_token = ${req.user.auth_token}`);
        }
        // else req.user = {}
        // req.user = await User.findOne({ email: 'shadespiritenator@gmail.com' });
        // req.user = await User.findOne({ email: 'random-mail-32@gmail.com' });
    };
    next();
});



// redirect for favicon.ico
//
router.get('/*', (req, res, next) => {
    const end = url_end(req);
    if (end == 'favicon.ico') res.redirect('/favicon.ico')
    next();
});

// if POST without BODY --> 401
//
router.post('/*', (req, res, next) => {
    if (!req.body) res.json({ code: 401, msg: 'No Body' });
    next();
});

export default router;