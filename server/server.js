import { normalizePort, onError, onListening } from './functions.js';

import fs from 'fs';
import http from 'http';
import https from 'https';

import dotenv from 'dotenv';
dotenv.config();

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import app from '../app/_app.js';
import { log } from '../my_modules/staff.js';


// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '80');
app.set('port', port);

const options = {
    ca: fs.readFileSync(__dirname + '/keys/ssl/ca_bundle.crt'),
    cert: fs.readFileSync(__dirname + '/keys/ssl/certificate.crt'),
    key: fs.readFileSync(__dirname + '/keys/ssl/private.key'),
    // requestCert: false,
    // rejectUnauthorized: false
};

// Servers 1
const server = http.createServer(app).listen(port);
server.on('error', onError);
server.on('listening', _ => onListening(server));

// Servers 2
const server2 = https.createServer(options, app).listen(443);

// Sockets
import socket from './socket.js';
socket(server, server2);


log('\n Run: server.js: '.info, server.address());


