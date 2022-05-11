const level = '../';
import { log, rand_str_long, pro, lex, } from '../my_modules/staff.js';
import { auth } from '../services/index.js';

const register = async (req, res) => {
    try {
        pro('Con: Register', module.filename, req.body);
        // do
        await auth.registration(req.body);
        // send msg
        return (result.ok) ? send('ok', req, res, 'User is registered') : error('custom', req, res, 409, result.err);
    } catch (e) {
        lex(e, module.filename);
        error(e, req, res, 500, 'Cannot register ');
    };
};

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

export { register, changePassword, restoreAccess, restorePassword };

