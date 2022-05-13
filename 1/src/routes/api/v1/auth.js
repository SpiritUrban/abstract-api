const level = '../../../';
import express from 'express';
const router = express.Router();
import { mail } from '../../../services/index.js';
import { RegisterController, changePassword, restoreAccess, restorePassword } from '../../../controllers/auth.js';
import { apiEnsureAuthenticated } from '../../../my_modules/lib.js';

// !!!
// router.post('/register', (req, res) => register.go(req, res)); // ................................................... Registration
router.post('/register', async (req, res) =>{
    await new RegisterController(req, res).go(req, res)
} );  
// router.post('/register', (req, res) => new RegisterController().go(req, res)); // ................................................... Registration
// router.post('/register', (req, res) => {
//     console.log(99999999999999);
//     res.json({f:5})
// });

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

