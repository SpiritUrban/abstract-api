import os from 'os';
import dns from 'dns';

import { log, logArr } from '../my_modules/staff.js';
let count = 0;

export default function info() {
  // log(count++);
  log('hostname::::::::: '.data, `${os.hostname()}`.info)
  log('total memory::::: '.data, `${os.totalmem()}`.info)
  console.log('free memory:::::: '.data, `${os.freemem()}`.info)

  dns.lookup(os.hostname(), (err, add, fam) => log('addr:::::::::::::  '.data, `${add}`.info));

  var networkInterfaces = os.networkInterfaces();


  process.argv.forEach((val, index) => {
    log(`arg ${index}:  ${val}`.data)
  });

  log(`AUTH_callback:  ${process.env.AUTH_callback}`.data);
  log(`API version:    ${process.env.VERSION}`.data);
  log(`Port:           ${process.env.PORT}`.data);
  log(`DB name:        ${process.env.DBNAME}`.data);


  // set ip env
  if (networkInterfaces.Ethernet) {
    process.env.ADDRESS = networkInterfaces.Ethernet[1].address
  } else if (networkInterfaces.ens3) {
    process.env.ADDRESS = networkInterfaces.ens3[0].address
  } else {
    process.env.ADDRESS = ' -- Need det address in file app/base.js -- '
  };

  log('****** net data *******');
  log(process.env.ADDRESS);
  //   address: '192.168.0.105',
  //   netmask: '255.255.255.0',
  //   family: 'IPv4',
  //   mac: '50:e5:49:36:c2:3a',
  //   internal: false,
  //   cidr: '192.168.0.105/24'
};

setTimeout(() => { info() }, 1000);
// setInterval(() => { info() }, 30 * 1000);