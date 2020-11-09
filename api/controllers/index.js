const config = require('../../config/default');
const colors = require('chalk');
const glob = require("glob");
const path = require('path');

module.exports = function (app) {
    // Routes in all subdirs

    glob.sync(__dirname + '/*').forEach(function (externalPath) {
        const baseDir = path.basename(externalPath, '.js');
        if (baseDir !== "common" &&
            baseDir !== "index")
            glob.sync(__dirname + '/' + baseDir + "/*.js").forEach(function (file) {
                const baseName = path.basename(file, '.js');
                if (baseName !== "common" &&
                    baseName !== "index") {
                    const route = '/api/' + baseName;
                    console.log('ROUTES: ' + colors.yellow(baseDir)+ '--> Adding route \t ' + colors.green(route) );
                    app.use(route, require(path.resolve(file)));
                }
            });
    });
}