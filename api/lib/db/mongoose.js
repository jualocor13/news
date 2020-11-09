module.exports = function (startServer) {
    //Import the mongoose module
    const mongoose = require('mongoose');
    const f = require('util').format;
    mongoose.Promise = global.Promise;
    const config = require('../../../config/default');

    // Connection URL
    const mongoDB ="mongodb://localhost:27017/newsDB";

    console.log('MONGOOSE: Trying connection to: ' + mongoDB);

    mongoose.connect(mongoDB, function (err) {
        if (err){
            console.error('MONGO: connection error:' + err.stack);
            process.exit(1);
        } else {
            console.info('MONGO: connection succees');
            startServer()
        }
    });

    return mongoose.connection;

};
