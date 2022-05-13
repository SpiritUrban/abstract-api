const level = '../../../';
import express from 'express';
const router = express.Router();
import { mail } from '../../../services/index.js';
import { RegisterController, changePassword, restoreAccess, restorePassword } from '../../../controllers/auth.js';
import { apiEnsureAuthenticated } from '../../../my_modules/lib.js';


async function mediator(req, res, next) {
    const DTO = await this.go(req, res);
    res.json(DTO);
};

[
    { path: '/register', method: 'post', controller: RegisterController }
].forEach(
    // router.post('/register', mediator.bind(new RegisterController()));
    item => router[item.method](item.path, mediator.bind(new item.controller()))
);


router.put('/change-password', apiEnsureAuthenticated, changePassword); // ............... change-password
router.post('/restore-access-by-email-or-username', restoreAccess); // ................... restore access by email
router.post('/restore-password', restorePassword); // .................................... restore access by 'email' & by 'user name'

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

