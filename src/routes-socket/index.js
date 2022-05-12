const level = '../';
import { log,  rand_str_long } from '../my_modules/staff.js';

// const { log, pro, lex } = require(`${level}my_modules/staff`);
import fs from 'fs';

const path_ctr_api = '../controllers/_api';

import appEvents from '../app-events/index.js';
import { socket } from '../services/index.js';

// const get_flow_chat_messages = require(`${path_ctr_api}/chat/get-chat-msgs`); // ........................ get
// const get_my_chat_messages = require(`${path_ctr_api}/chat/get-chat-msgs`); // .......................... get
// const get_all_unchecked_chat_messages = require(`${path_ctr_api}/chat/get-unchecked-chat-msgs`); // ..... get
// const chat_message = require(`${path_ctr_api}/chat/add-chat-msg`); // ................................... add
// const delete_chat_message = require(`${path_ctr_api}/chat/del-chat-msg`); // ............................ delete
// const check_all_messages = require(`${path_ctr_api}/chat/procedures/check-all-msgs`); // ................ edit
// const get_sys_messages = require(`${path_ctr_api}/sys/get-sys-msgs`); // ................................ get

// assistant
// const request_status = require(`${path_services}/sys/get-sys-msgs`); // .............................. get

const rs = (io) => {

    /****************** ROUTES **********************/
    function doIt(client, allEvents) {
        const endPoint = allEvents.data[0];
        const msg = allEvents.data[1];
        [
            // ['get-flow-chat-messages', () => get_flow_chat_messages(client, msg, msg.id)], // ................... get
            // ['get-my-chat-messages', () => get_my_chat_messages(client, msg, undefined)], // .................... get
            // ['get-all-unchecked-chat-messages', () => get_all_unchecked_chat_messages(client, msg)], // ......... get
            // ['chat-message', () => chat_message(client, msg)], // ............................................... add
            // ['delete-chat-message', () => delete_chat_message(client, msg)], // ................................. delete
            // ['check-all-messages', () => check_all_messages(client, msg)], // ................................... edit
            // ['get-sys-messages', () => get_sys_messages(client, msg)], // ....................................... get
        ].forEach((el, i) => {
            // log(endPoint == el[0], endPoint, el[0]);
            if (endPoint == el[0]) el[1]();
        })
    };

    function scripts(client) {
        appEvents.on("push-chat-msgs", (data) => {
            require(`${path_ctr_api}/chat/get-chat-msgs`)(client, null, undefined);
        });
        appEvents.on("push-sys-message", (data) => {
            client.emit('one-sys-message', data); // .................................................... send messages to user
            // require(`${path_ctr_api}/chat/get-chat-msgs`)(client, null, undefined);
        });
        appEvents.on("force-the-front-to-request-your-messages", () => {
            client.emit('front---you-must-request-your-messages', ''); // .................................................... send messages to user
        });
    };

    io.on('connection', (client) => {
        return 'TEMP DROP !!!'
        
        socket.connection(client);
        scripts(client);
        client.on('*', (allEvents) => doIt(client, allEvents));
        client.on('disconnect', _ => socket.disconnection(client));
    });
};

export default rs;