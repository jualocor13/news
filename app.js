let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let config = require('./config/default.js');
const pathVersions = './uploads';
let app = express();

let startServer = function startServer() {
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));

    
    let cors = require("cors");
    let corsOptions = {
        credentials: true,
        origin: true
    };
    app.use(cors(corsOptions));

    require('./api/controllers')(app);
// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });

// error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500).send({'rawError': err.message});
    });
};

require('./api/lib/db/mongoose')(startServer);

module.exports = app;
