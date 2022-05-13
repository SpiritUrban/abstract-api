const level = '../../';
import { log, rand_str_long, pro, lex, } from '../../my_modules/staff.js';
import { User } from '../../models/index.js';
import mail from './mail.service.js';
import user from './user.service.js';
import crypto from './crypto.service.js';
const userService = user;

class AuthService {
    constructor() { }

    async registration(o) {
        // var-s
        const { email, password, username, firstName, lastName } = o;
        const { first_name, last_name } = o;
        // checking
        if (!email) return { ok: false, err: 'Email required!' };
        if (!password) return { ok: false, err: 'Password required!' };
        if (!username) return { ok: false, err: 'Username required!' };
        // do
        const result = await userService.add({
            check_unique: {
                email: true,
                username: true
            },
            email,
            password,
            name: o.name,
            username,
            first_name,
            last_name,
        });
        if (!result.ok) return result;
        else return { ok: true }
    }

    async changePassword(o, user_id, user_password) {
        // var-s
        var hp = crypto.hash(o.old_password + '');
        var n_hp = crypto.hash(o.new_password + '');
        // Check
        if (hp !== user_password) return { ok: false, err: 'User password not correct!' }
        // Change password
        await User.findOneAndUpdate({ _id: user_id }, { password: n_hp });
        return { ok: true }
    }

    async restorePassword(o) {
        // var-s
        const _id = o.user;
        const token = o.token;
        const n_hp = crypto.hash(o.new_password);
        // get user
        let user = await User.findOne({ _id }).exec();
        // Check
        if (token !== user.email_token) return error('custom', req, res, 401, 'User token not correct!');
        // Change password
        await User.findOneAndUpdate({ _id }, { password: n_hp, email_token: '' });
        return 1;
    }

    async restorePasswordSimple(o) {
        // just send mail
        await mail.sendMailWithPassword(o.email).catch(err => {
            throw err;
        });
    }

    async restoreAccess(o) {
        // var-s
        const email = o.login_email
        const username = o.login_username
        // find by 'email' or 'username'
        let user = (email) ?
            await User.findOne({ email }).exec() :
            await User.findOne({ username }).exec();
        if (user == null) error('custom', req, res, 409, 'E-mail or user does not exist!');
        const email_token = rand_str_long();
        user = await User.findOneAndUpdate({ email }, { email_token });
        // send mail for restore password
        mail.sendMailAndRestorePassword(email);
        return 1;
    }

    async some(o) {
    }

};

export default new AuthService();
