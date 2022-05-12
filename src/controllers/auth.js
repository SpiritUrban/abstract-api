const level = '../';
import { log, rand_str_long, pro, lex, } from '../my_modules/staff.js';
import { auth } from '../services/index.js';
import Controller from '../classes/controller.class.js'



class RegisterController extends Controller {
    conName = 'Register';
    successMsg = 'User is registered';
    unSuccessMsg;
    errMsg = 'Cannot register ';
    constructor() { super(  'Register'); }
    do = async _ => this.result = await auth.registration(this.req.body);
    // async do() {
    //     this.result = await auth.registration(this.req.body);
    // }
    fork = _ => this.result.ok ? this.ok() : this.no()
    ok = _ => this.successRes()
    no() {
        this.unSuccessMsg = this.result.msg;
        this.unSuccessRes('custom', 409);
    }
}

const register = new RegisterController();
// const some = register1.go;
// export { some }


class Car {
constructor(brand) {
    this.carname = brand;
  }
  present() {
    return 'I have a ' + this.carname;
  }
  go (){
      log('--------------go--------------', this.carname)
  }
}

class Model extends Car {
  constructor(brand, mod) {
    super(brand);
    this.model = mod;
  }
  show() {
    return this.present() + ', it is a ' + this.model;
  }
}

const mycar = new Model("Ford", "Mustang");
log(mycar.show())






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

