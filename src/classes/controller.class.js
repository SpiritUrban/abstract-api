import { log, rand_str_long, pro, lex, } from '../my_modules/staff.js';

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
    result = {test: 1};
    req ={};
    res={};
    constructor(_this, conName) {
        log(this)
        // this = _this
        this.conName = conName;
        this.result = {};
        this.req = {};
        this.res = {};
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
            // pro(`Controller: ${this.conName}`, module.filename,  req.body);
            await this.do();
            this.fork();
        } catch (e) {
            this.err = e;
            lex(e );
            this.error(500, this.errMsg);
        };
    }
};

export default Controller;