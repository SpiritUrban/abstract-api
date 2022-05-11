import debug from 'debug';
const debugger1 = debug('js-clan:server');

// Normalize a port into a number, string, or false.
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) return val; // named pipe
    if (port >= 0) return port; // port number
    return false;
};

// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') throw error;
    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    };
};

// Event listener for HTTP server "listening" event.
function onListening(server) {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debugger1('Listening on ' + bind);
};

export { normalizePort, onError, onListening };