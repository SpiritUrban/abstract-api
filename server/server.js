import dotenv from 'dotenv';
dotenv.config();
import { onError, onListening } from './functions.js';
import { options } from './options.js';
import http from 'http';
import https from 'https';
import app from '../app/_app.js';
import { log } from '../my_modules/staff.js';
import port from './normalize.js'
app.set('port', port);

// Servers 1
const server = http.createServer(app).listen(port);
server.on('error', onError);
server.on('listening', _ => onListening(server));

// Servers 2
const server2 = https.createServer(options, app).listen(443);

// Sockets
import socket from './socket.js';
socket(server, server2);

log(`\n All servers have been successfully launched !!!`.info);
log(server.address());
log();


