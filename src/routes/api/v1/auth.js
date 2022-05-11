import express from 'express';
const router = express.Router();
const level = '../../../';
const authControllers = `${level}controllers/auth`;
import { mail } from '../../../services/index.js';

import { register, changePassword, restoreAccess, restorePassword } from '../../../controllers/auth.js';

import { apiEnsureAuthenticated } from '../../../my_modules/lib.js';

router.post('/register', register); // Registration
router.put('/change-password', apiEnsureAuthenticated, changePassword); // change-password
router.post('/restore-access-by-email-or-username', restoreAccess); // restore access by email
router.post('/restore-password', restorePassword); // restore access by 'email' & by 'user name'

//
router.post('/send-verification-mail', apiEnsureAuthenticated, (req, res) => {
    mail.sendMailVerification(req.user._id);
    res.json({ ok: true, msg: 'hz' });
});

///////////////////////////////////////////////////////
//                   local strategy                  //
///////////////////////////////////////////////////////

// Auth system
import lS from '../../../controllers/local-strategy.js';

router.post('/login', lS.login);
router.get('/logout', lS.logout); // /api/auth/logout
router.post('/logout', lS.logout);

export default router;

