import { log } from '../my_modules/staff.js';

import { Server, Socket } from "socket.io";
import socketioWildcard from 'socketio-wildcard';
import routesSocet from '../routes-socket/index.js';
const wildcard = socketioWildcard();

export default (server, server2) => {

    const cors = {
        // origin: '*',
        origin: [process.env.ORIGIN1, process.env.ORIGIN2, "http://localhost", "https://localhost", "http://localhost:4200", "https://localhost:4200"],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        // credentials: false
    };

    var io1 = new Server(server, { cors });
    io1.use(wildcard);
    routesSocet(io1);

    var io = new Server(server2, { cors });
    io.use(wildcard);
    routesSocet(io);
};