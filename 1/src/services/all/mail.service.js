const level = '../../';
import { log, rand_str_long, pro, lex, } from '../../my_modules/staff.js';
import { User, App } from '../../models/index.js';
import path from'path';
import app from './app.service.js'; // ... !!! must be this way
import nodemailer from'nodemailer';

// Open access ------------------- https://www.youtube.com/watch?v=JJ44WA_eV8E
// Good, simple, description ----- https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799
// Additionally ------------------ http://qaru.site/questions/495891/sending-email-via-nodejs-using-nodemailer-is-not-working
//
// You need to open access here for it to work - https://myaccount.google.com/u/4/lesssecureapps?pageId=none
// ............................................. https://myaccount.google.com/lesssecureapps
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const self = {

    //
    // init
    //
    init: async () => {
        const appInfo = await app.getInfo();
        if (!appInfo.gmailSettings) throw 'Error: No data for init gmail'
        const gmailSettings = appInfo.gmailSettings
        //
        self.transporter = nodemailer.createTransport({
            // service: 'Gmail',
            host: "smtp.gmail.com",
            port: 465, //587,
            secure: true, //false, // true for 465, false for other ports
            auth: {
                user: gmailSettings.address, // process.env.GMAIL, // GMAIL=we.js.clan@gmail.com
                pass: gmailSettings.password // process.env.GMAIL_PASS // GMAIL_PASS=wesuperpower
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 1 * 60 * 1000
        });
    },

    //
    // main
    //
    send: (from, to, subject, html) => {
        return new Promise(async (resolve, reject) => {
            await self.init();
            let mailOptions = { from, to, subject, html };
            self.transporter.sendMail(mailOptions, async (err, res) => {
                // console.log('err, res', err, res)
                // if (err) return new Error(err)
                if (err) reject(err)//throw new Error(err)
                else resolve('Email Sent');
            });
        });

    },

    //
    // mail restore simple
    //
    sendMailWithPassword: (email) => {
        return new Promise(async (resolve, reject) => {
            let user = await User.findOne({ email });
            const template = (user.open_password) ?
                // yes
                [
                    `FERON <${process.env.GMAIL}> `, // ........................... from
                    email, // ..................................................... to
                    'Restore of password', // ..................................... subject
                    `<p> You password: ${user.open_password} </p>`// .............. html
                ] :
                // no
                [
                    `FERON <${process.env.GMAIL}> `, // ........................... from
                    email, // ..................................................... to
                    'Restore of password', // ..................................... subject
                    `<p> Only visitors can get password. Contact your main administrator to recover your password. </p>`// .............. html
                ];
            await self.send(...template).catch(err => { reject(err) });
            resolve('ok');
        });
    },

    //
    // mail restore
    //
    sendMailAndRestorePassword: async (email) => {
        let user = await User.findOne({ email });
        self.send(
            `FERON <${process.env.GMAIL}> `, // from
            user.email, // to
            'Restore of password', // subject
            // html
            `<p>
                To restore your password, go to this link. 
                <a href="${process.env.HOST}/pages/auth/restore-password?user=${user._id}&token=${user.email_token}" target="_blank">link</a>
            </p>`
            + new Date(),
        );
        return 1;
    },

    //
    // mail verification
    //
    sendMailVerification: async (user_id) => {
        let user = await User.findOne({ _id: user_id });
        self.send(
            `FERON <${process.env.GMAIL}> `, // from
            user.email, // to
            'Mail Confirmation', // subject
            // html
            `<p>
                To verify your mail, go to this link. 
                <a href="${process.env.HOST}/pages/auth/mail-verify?user=${user._id}&token=${user.email_token}" target="_blank">link</a>
            </p>`
            + new Date(),
        );
    },

    //
    // mail test
    //
    test: async (email) => {
        self.send(
            `FERON <${process.env.GMAIL}> `, // from
            email, // to
            'test ', // subject
            // html
            `<p>
                   TEST
            </p>`
            + new Date(),
        );
    },
};

export default self;
