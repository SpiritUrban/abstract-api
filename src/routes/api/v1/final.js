const level = '../../../';
import { log,  rand_str_long } from '../../../my_modules/staff.js';
import { User, Session } from '../../../models/index.js';

import fs from 'fs';
const fsp = fs.promises;
import express from 'express';

const router = express.Router();

import bcrypt from 'bcrypt';


// Update User info
router.put('/user', async (req, res) => {
    await User.findOneAndUpdate(
        { email: req.user.email },
        { [req.body.key]: req.body.newValue }
    );
    res.json({ ok: true });
})

///////////////////////////////////////////////////////
//                     Session                       //
///////////////////////////////////////////////////////

// finger print mechanism
router.post('/session', async (req, res) => {
    try {
        const systemInfo = req.body;
        const random = Math.random();
        const fingerPrint = await bcrypt.hash(systemInfo.appVersion + random, 10);
        const session = new Session({
            appVersion: systemInfo.appVersion,
            fingerPrint: fingerPrint,
            random: random,
            ip: req.ip
        })
        session.save();
        res.json({ session: fingerPrint });
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get('/session-info', (req, res) => res.json({ user: req.userSafe }));

router.get(['/user', '/get-user-info-if-logged'], async (req, res) => {
    try {
        req.user.password = null;
        req.user.email_token = null;
        // const fakeUser = await User.findOne({email: 'shadespiritenator@gmail.com'})
        // res.json(fakeUser);
        res.json(req.user);
    } catch (error) {
        res.sendStatus(500);
    }
});
 
router.get('/*', async (req, res, next) => {
    log("END")
    // res.end(404);
});

export default router;
