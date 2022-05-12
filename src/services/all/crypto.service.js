const level = '../../';
import { log, rand_str_long, pro, lex, } from '../../my_modules/staff.js';
import sha1 from'sha1';

const self = {
    hash:  (input) => sha1(sha1(input) + sha1(process.env.PSWD_SALT)),
}

export default self;