let config = require("../../config/default");

module.exports.redirectCustomClient = function (route) {
    return function (request, response, next) {
        next();
    }
};
