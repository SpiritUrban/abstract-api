const level = '../../';
import { log, rand_str_long, pro, lex, } from '../../my_modules/staff.js';
import { User } from '../../models/index.js';
import mail from './mail.service.js'; 
import crypto from './crypto.service.js';
import uuid from'uuid';

const self = {
    getAll: async (q = {}) => await User.find(q),
    getByToken: async (auth_token) => await User.findOne({ auth_token }),
    getByAssToken: async (ass_token) => await User.findOne({ ass_token }),
    getOne: async (q) => await User.findOne(q),

    add: async (msg) => {
        const mailOccupied = await User.findOne({ email: msg.email }); // Email already exists  ?
        if (mailOccupied) return { ok: false, msg: 'Email already exists!' };
        const usernameOccupied = await User.findOne({ username: msg.username }); // User already exists  ?
        if (usernameOccupied) return { ok: false, msg: 'User already exists!' };
        // do
        const userInfo = {
            role: msg.role || 'guest',
            name: msg.name || msg.first_name + ' ' + msg.last_name,
            phone: msg.phone,
            language: msg.language || 'en',
            room: msg.room,
            username: msg.username,
            email: msg.email,
            open_password: msg.open_password,
            password: crypto.hash(msg.password + ''),
            email_token: rand_str_long(),
            auth_token: rand_str_long(),
            ass_token: rand_str_long(),
            numeric_id: randomIntFromInterval(11111111, 99999999),
            phone_pin: randomIntFromInterval(111111, 999999),
            link_pin: randomIntFromInterval(111111, 999999),
            wallets: {
                USD: {
                    balance: 0
                }
            },
            facebook: {
                id: '',
                token: '',
                email: '',
                username: ''
            },
            google: {
                id: '',
                token: '',
                email: '',
                username: ''
            },
            active: false,
            email_verif: false,
            phone_verif: false,
            ever_cha: uuid.v1(),
            ever_sec: crypto.hash(uuid.v1())
        };
        await self.create(userInfo);
        try { mail.sendMailVerification(u._id); } // ...................................... send mail for verification
        catch (error) { log('Mails again not working! (file: controllers/users/create-new-user)'); };
        return { ok: true };
    },

    create: async (o) => await new User(o).save(),

    delAll: async () => await User.deleteMany({}),

    edit: async (_id, msg) => {
        let edit = {}; // ......................................................... edit obj
        const isArray = msg instanceof Array; // ............................. must be array
        if (isArray) msg.forEach(el => edit[el.key] = el.newValue); // ...... build edit obj
        await User.findOneAndUpdate({ _id }, edit); // .............................. update
        return 1;
    },

    fake: async () => {
        return JSON.parse(`{
            "wallets": {
            "USD": {
                "balance": 0
            }
            },
            "facebook": {
            "id": "",
            "token": "",
            "email": "",
            "username": ""
            },
            "google": {
            "id": "",
            "token": "",
            "email": "",
            "username": ""
            },
            "isLogged": true,
            "purchases_made": [],
            "saved_numbers": [],
            "linked_users": [],
            "_id": "5e72314405de434144dca5be",
            "username": "testUser",
            "email": "shadespiritenator@gmail.com",
            "email_token": "077q6b76v9vwqtaryepfjbseao0fdprrj7chg22dlhj",
            "password": "cd2a9a2e8d3572113b95e3b60bf626a77899ec6b",
            "phone_pin": 730901,
            "link_pin": 272749,
            "active": false,
            "email_verif": false,
            "phone_verif": false,
            "ever_cha": "7645e520-6925-11ea-977c-578729c8c9f9",
            "ever_sec": "4c04539621e9baec7e8651059293a71573409788",
            "last_login": "2020-03-18T14:33:40.735Z",
            "last_appeal": "2020-03-18T14:33:40.736Z",
            "__v": 0
        }`);
    },
};

export default self;