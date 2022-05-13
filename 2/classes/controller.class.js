import { log,} from '../../../high-level/index.js';

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
    result = { test: 1 };
    req = {};
    res = {};
    constructor(_this, conName) {
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
        log('unSuccessRes')
        this.dto = {
            code: '200',
            result: this.result,
            ok: false,
            success: false,
            msg: 'Not good :(',
            msg2: this.unSuccessMsg,
            from: 'send Universal'
        };
        log('unSuccessRes')
        this.res.json(this.dto);
        log('unSuccessRes')
    };
    errorRes() {
        this.dto = {
            code: '500',
            status: '',
            err: this.err.toString(),
            success: false,
            msg: 'Error in ' + this.req.url,
            msg2: this.errMsg,
            from: 'error Universal'
        };
        this.res.json(this.dto);
    };
    async go(req, res) {
        this.req = req;
        this.res = res;
        try {
            log(`Controller: ${this.conName}`, this.req.body);
            // return
            await this.do();
            
            log('afterrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            return this.fork();

        } catch (e) {
            this.err = e;
            log(e);
            this.errorRes();
        };
    }
};

export default Controller;