const log = console.log

//
// local or prod 
//

import os from 'os';
const hostname = os.hostname();

function isMy(){
    log('\n It is my Local PC :)'.warn)
    process.env.FB_ID = '455174914848353'
    process.env.FB_KEY = '30a983716bd55cf5f36e1626fe3b20b8'
    process.env.FB_CLB = 'http://localhost/auth/facebook/callback'
    process.env.HOST = 'http://localhost'
};

function isOther(){
    log('\n It is NOT my Local PC !!!')
};

if (hostname == 'DESKTOP-HG5HQKQ') isMy()
else isOther();

//
// --dev ?
//
process.argv.forEach((val, index) => {
    if (val == '--dev') { } else { }
});

export default function mode() {};
