import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const options = {
    ca: fs.readFileSync(__dirname + '/keys/ssl/ca_bundle.crt'),
    cert: fs.readFileSync(__dirname + '/keys/ssl/certificate.crt'),
    key: fs.readFileSync(__dirname + '/keys/ssl/private.key'),
    // requestCert: false,
    // rejectUnauthorized: false
};