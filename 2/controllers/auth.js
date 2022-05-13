import { auth } from '../services/index.js';
import { log, } from '../../../high-level/index.js';
import Controller from '../classes/controller.class.js'

class RegisterController extends Controller {
    conName = 'Register';
    successMsg = 'User is registered';
    unSuccessMsg;
    errMsg = 'Cannot register!';
    constructor() { super() }
    do = async _ => this.result = await auth.registration(this.req.body);
    fork = _ => this.result.ok ? this.successDTO : this.unSuccessDTO
}


const changePassword = async (req, res) => {
    try {
        pro('Con: Change password', module.filename, req.body);
        // do
        const result = await auth.changePassword(req.body, req.user._id, req.user.password);
        // send msg
        return (result.ok) ? send('ok', req, res, 'Password changed') : error('custom', req, res, 401, result.err);
    } catch (e) {
        lex(e, module.filename);
        error(e, req, res, 500, 'Cannot change password! ');
    };
};

const restoreAccess = async (req, res) => {
    try {
        pro('Con: Restore access', module.filename, req.body);
        // do
        await auth.restoreAccess(req.body);
        // send msg
        return send('ok', req, res, 'Your password has been sent to your mail.');
    } catch (e) {
        lex(e, module.filename);
        error(e, req, res, 500, 'Cannot restore access! ');
    };
};

const restorePassword = async (req, res) => {
    try {
        pro('Con: Restore password', module.filename, req.body);
        // do
        await auth.restorePasswordSimple(req.body);
        // send msg
        return good(null, req, res, 'Mail sent!'); // Password changed | Mail sent
    } catch (e) {
        lex(e, module.filename);
        error(e, req, res, 500, 'Cannot restore password! ');
    };
};

export { RegisterController, changePassword, restoreAccess, restorePassword };

