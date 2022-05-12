const level = '../';
import { log, rand_str_long, pro, lex, } from '../my_modules/staff.js';
import { auth } from '../services/index.js';




// class Car {
//     constructor(brand) {
//         this.carname = brand;
//     }
//     present() {
//         return 'I have a ' + this.carname;
//     }
// }

// class Model extends Car {
//     constructor(brand, mod) {
//         super(brand);
//         this.model = mod;
//     }
//     show() {
//         return this.present() + ', it is a ' + this.model;
//     }
// }

// mycar = new Model("Ford", "Mustang");

class DTO {
    constructor() { }
    code = '200';
    result;
    ok = true;
    success = true;
    msg = 'Good :)';
    msg2 = msg2 || '';
    from = 'send Universal';
}

class Controller {
    result;
    constructor() {
    }
    successRes() {
        this.dto = {
            code: '200',
            result: this.result,
            ok: true,
            success: true,
            msg: 'Good :)',
            msg2: this.successMsg,
            from: 'send Universal'
        }
        this.res.json(this.dto);
    };
    unSuccessRes() {
        this.dto = {
            code: '200',
            result: this.result,
            ok: false,
            success: false,
            msg: 'Not good :(',
            msg2: this.unSuccessMsg,
            from: 'send Universal'
        };
        this.res.json(this.dto);
    };
    errorRes(status) {
        this.dto = {
            status,
            err: this.err.toString(),
            success: false,
            msg: 'Error in ' + req.url,
            msg2: this.errMsg,
            from: 'error Universal'
        };
        this.res.json(this.dto);
    };
    async go(req, res) {
        this.req = req;
        this.res = res;
        try {
            pro(`Controller: ${conName}`, module.filename, this.req.body);
            await this.do();
        } catch (e) {
            this.err = e;
            lex(this.err, module.filename);
            this.error(500, this.errMsg);
        };
    }
};


class RegisterController extends Controller {
    conName = 'Register';
    successMsg = 'User is registered';
    unSuccessMsg;
    errMsg = 'Cannot register ';
    constructor() { 
        super();
    }
    async do() {
        this.result = await auth.registration(this.req.body);
        this.fork();
    }
    fork() {
        this.result.ok ? this.ok() : this.no();
    }
    ok() {
        this.successRes();
    }
    no() {
        this.unSuccessMsg = this.result.msg;
        this.unSuccessRes('custom', 409);
    }
}

const register1 = new RegisterController();
// const some = register1.go;
// export { some }


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

