const level = '../../../';
import express from 'express';
const router = express.Router();

import { mail } from '../../../services/index.js';
import { u, as, sas, mas } from './lib/guards.js';

///////////////////////////////////////////////////////
//                    DEV !!!                        //
///////////////////////////////////////////////////////

router.get('/all-users', as, (req, res, next) => {
    const users = ['Васілій', 'Кум', 'Бєлка'];
    res.send(users);
});

router.get('/clean', (req, res, next) => {
    // User.remove({}, () => { }); // !!!!!!!!!!!!!!!!!!!!!!
    res.send('clean');
});

router.get('/send-mail', (req, res, next) => {
    mail.send(
        'Vitaliy <we.js.clan@gmail.com> ', // from
        'shadespiritenator@gmail.com', // to
        'Nodemailer test', // subject
        'Hello Gmail 2- ' + new Date(), // text
    )
    console.dir(req.headers)
    console.dir(req.rawHeaders)
    res.send({ m: 'Hello!' })
});

export default router;

