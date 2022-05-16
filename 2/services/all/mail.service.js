import { log } from 'high-level';
import { User, App } from '../../models/index.js';
import path from 'path';
import app from './app.service.js'; // ... !!! must be this way
import nodemailer from 'nodemailer';

// Open access ------------------- https://www.youtube.com/watch?v=JJ44WA_eV8E
// Good, simple, description ----- https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799
// Additionally ------------------ http://qaru.site/questions/495891/sending-email-via-nodejs-using-nodemailer-is-not-working
//
// You need to open access here for it to work - https://myaccount.google.com/u/4/lesssecureapps?pageId=none
// ............................................. https://myaccount.google.com/lesssecureapps
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class Mail {
    from
    to
    subject
    html
    constructor() { }
    send() {
        // const template = 
    }
};

// old: sendMailWithPassword
//
class MailWithPassword extends Mail {
    mailName = 'MailWithPassword';
    from = `FERON <${process.env.GMAIL}> `;
    to = email;
    subject = 'Restore of password';
    html = `<p> You password: ${user.open_password} </p>`;
    constructor() { super() }
};


class MailService {


    constructor() { }

    //
    // init
    //
    async init() {
        const appInfo = await app.getInfo();
        if (!appInfo.gmailSettings) throw 'Error: No data for init gmail'
        const gmailSettings = appInfo.gmailSettings
        //
        this.transporter = nodemailer.createTransport({
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
    }

    //
    // main
    //
    async send(template) {
        await this.init();
        let template = { from, to, subject, html };
        this.transporter.sendMail(template, async (err, res) => {
            // if (err) return new Error(err)
            if (err) reject(err); //throw new Error(err)
            else resolve('Email Sent');
        });
    }

    async template(name) {
        const example = {
            from: null,
            to: null,
            subject: null,
            html: null
        }
        return [

        ];
    };

    //
    // mail restore simple
    //
    async sendMailWithPassword(email) {
        try {
            let user = await User.findOne({ email });
            const template = (user.openPassword) ?
                {
                    from: `COMPANY <${process.env.GMAIL}> `,
                    to: email,
                    subject: 'Restore of password',
                    html: `<p> You password: ${user.open_password} </p>`
                } : {
                    from: `COMPANY <${process.env.GMAIL}> `,
                    to: email,
                    subject: 'Restore of password',
                    html: `<p> Only visitors can get password. Contact your main administrator to recover your password. </p>`
                };
            await this.send(template);
            return { ok: true };
        } catch (err) {
            return { ok: false, err }
        }
    }

    //
    // mail restore
    //
    async sendMailAndRestorePassword(email) {
        let user = await User.findOne({ email });

        const example = {
            from: `COMPANY <${process.env.GMAIL}> `,
            to: user.email,
            subject: 'Restore of password',
            html: `
            <p>
                To restore your password, go to this link. 
                <a href="${process.env.HOST}/pages/auth/restore-password?user=${user._id}&token=${user.email_token}" target="_blank">link</a>
            </p>`
                + new Date()
        };
        this.send(example);
        return { ok: true }
    }

    //
    // mail verification
    //
    async sendMailVerification(user_id) {
        let user = await User.findOne({ _id: user_id });
        const example = {
            from: `COMPANY <${process.env.GMAIL}> `,
            to: user.email,
            subject: 'Mail Confirmation',
            html: `
            <p>
                To verify your mail, go to this link. 
                <a href="${process.env.HOST}/pages/auth/mail-verify?user=${user._id}&token=${user.email_token}" target="_blank">link</a>
            </p>`
                + new Date()
        }
        this.send(example);
    }

    //
    // mail test
    //
    async test(email) {
        const example = {
            from: `COMPANY <${process.env.GMAIL}> `,
            to: email,
            subject: 'test ',
            html: `
            <p>
                TEST
            </p>`
                + new Date()
        }
        this.send(example);
    }
};

export default new MailService();
