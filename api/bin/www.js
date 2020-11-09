/**
 * Module dependencies.
 */

const app = require('../../app');
const http = require('http');
const https = require('https');
const fs = require('fs');
require('app-module-path').addPath(__dirname);

/**
 * Get port from environment and store in Express.
 */

let port ;

port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const testing = process.env.TESTING || false;
let server;

app.set('port', '4001');
server = http.createServer(app);
server.listen('4001');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

module.exports =  server;