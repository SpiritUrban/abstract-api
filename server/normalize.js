// Get port from environment and store in Express.

//
// Normalize a port into a number, string, or false.
//
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) return val; // named pipe
    if (port >= 0) return port; // port number
    return false;
};

export default normalizePort(process.env.PORT || '80');