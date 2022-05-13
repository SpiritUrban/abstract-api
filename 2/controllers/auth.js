// const level = '../';
// import { log, rand_str_long, pro, lex, } from '../my_modules/staff.js';
// import { auth } from '../services/index.js';
import { log,} from '../../../high-level/index.js';

import Controller from '../classes/controller.class.js'



class RegisterController extends Controller {
    conName = 'Register';
    successMsg = 'User is registered';
    unSuccessMsg;
    errMsg = 'Cannot register ';
    constructor(req, res) { 
        super(  'Register');
        this.req = req;
        this.res = res;
     }
    // do = async _ => this.result = await auth.registration(this.req.body);
    async do(){
        // this.result = await auth.registration(this.req.body);
        log('66666666666666666666666666666', this.result)
    } 

    // fork = _ => this.result.ok ? this.ok() : this.no()

    fork() {
        log('this.result', this.result)
        //  this.result.ok ? this.ok() : this.no()
        return this.result.ok ? {K:1} : {K:11111}
    }

    ok = _ => this.successRes()
    no() {
        this.unSuccessMsg = this.result.msg;
        this.unSuccessRes();
    }
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

