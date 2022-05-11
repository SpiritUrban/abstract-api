const level = '../../../../';
import { log,  rand_str_long } from '../../../../my_modules/staff.js';
import { User } from '../../../../models/index.js';

const essence = {
    sas: {
        roles: ['superadmin'],
        rejectMsg: 'Not logged or not SuperAdmin'
    },
    mas: {
        roles: ['superadmin', 'main-admin'],
        rejectMsg: 'Not logged or not MainAdmin'
    },
    as: {
        roles: ['superadmin', 'main-admin', 'admin'],
        rejectMsg: 'Not logged or not Admin'
    },
    u: {
        roles: ['superadmin', 'main-admin', 'admin', 'visitor'],
        rejectMsg: 'Not logged or no role'
    },
};

const preprocessing = (req, res, next) => {
    const devUrls = ['http://localhost:4200', 'http://192.168.0.105:4200'];
    const auth_token = req.headers.auth_token; // ............................................ string
    const email = req.headers.email; // ...................................................... string
    const isDevUrl = devUrls.some(url => url == req.headers.origin);  // ..................... boolean
    const isDevMode = isDevUrl; // ........................................................... boolean
    const isHasToken = (auth_token !== 'no') ? true : false; // .............................. boolean
    // if (isDevMode && isHasToken) req.user = await User.findOne({ email }); // ................ do
    if (!req.user) return res.json({ ok: false, msg: 'No User!' });
    return true
};

const hasAccess = (roles, req) => roles.some(role => role == req.user.role);

const reject = (res, msg) => res.json({ ok: false, msg, noAccess: true });

const core = (is, req, res, next) => {
    const roles = essence[is].roles;
    if (!preprocessing(req, res, next)) return;
    hasAccess(roles, req) ? next() : reject(res, essence[is].rejectMsg); // next or reject
};

const sas = async (req, res, next) => core('sas', req, res, next); // .... 1. Admin of all system
const mas = async (req, res, next) => core('mas', req, res, next); // .... 2. Main Hotel Admin
const as = async (req, res, next) => core('as', req, res, next); // ...... 3. Regular Hotel Admin
const u = async (req, res, next) => core('u', req, res, next); // ........ 4. Low

export  {
    sas,
    mas,
    as,
    u,
};
