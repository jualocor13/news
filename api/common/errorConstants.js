const genericErrorConstants = require("../lib/errors/commonGenericErrors");
const errorNames = genericErrorConstants.errorNames;
module.exports.errorNames = errorNames;

const errorCodes = function (code) {
    const genericCode = genericErrorConstants.errorCodes(code);
    return genericCode
};

module.exports.errorCodes = errorCodes;
const errors = genericErrorConstants.errors;
module.exports.errors = errors;
module.exports.responseWithError = genericErrorConstants.responseWithError;
