/**
 * @apiDefine ErrorGroup
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "localizedDescription": "Could not find the object",
 *       "rawError": {
 *          reason: "reason of the error",
 *          values: {
 *              any: "interesting value to check the error"
 *          }
 *       },
 *       "errorCode": -4
 *     }
 *
 * @apiError (Errors) {String} localizedDescription A user-friendly description of the error. Can be shown to the user
 * @apiError (Errors) {String} rawError A technical description of the error
 * @apiError (Errors) {String} rawError.reason A technical reason of the error
 * @apiError (Errors) {String} rawError.values Any interesting data to check the error
 * @apiError (Errors) {String} [errorCode] A code for the error
 * @apiError (Errors) errorCode.-1 Generic error. Usually 500 http code. See raw value for more info.
 * @apiError (Errors) errorCode.-7 There is a validation error on your query
 * */


module.exports.errorNames = {
    generic: "generic",
    userNotFound: "userNotFound",
    dbGenericError: "dbGenericError",
    notFound: "notFound",
    user_exists: "user_exists",
    unauthorized: "unauthorized",
    validation: "validation",
    object_exists: "object_exists"
};

module.exports.errorCodes = function (code) {
    switch (code) {
        /**
         * @apiDefine GenericError
         * @apiError (Errors) errorCode.-1 Generic error. Usually 500 http code. See raw value for more info.
         **/
        case module.exports.errorNames.generic:
            return -1;
        /**
         * @apiDefine DBGenericError
         * @apiError (Errors) errorCode.-2 Database Generic error. See raw value for more info
         **/
        case module.exports.errorNames.dbGenericError:
            return -2;
        /**
         * @apiDefine UserNotFoundError
         * @apiError (Errors) errorCode.-3 User not found
         **/
        case module.exports.errorNames.userNotFound:
            return -3;
        /**
         * @apiDefine NotFoundError
         * @apiError (Errors) errorCode.-4 Resource not found
         */
        case module.exports.errorNames.notFound:
            return -4;
        /**
         * @apiDefine UserExistsError
         * @apiError (Errors) errorCode.-5 User already registered
         */
        case module.exports.errorNames.user_exists:
            return -5;
        /**
         * @apiDefine UnathorizedError
         * @apiError (Errors) errorCode.-6 User is not authorized to perform this action
         */
        case module.exports.errorNames.unauthorized:
            return -6;
        case module.exports.errorNames.validation:
            return -7;
        /**
         * @apiDefine ObjectExistsError
         * @apiError (Errors) errorCode.-8 Object already registered
         */
        case module.exports.errorNames.object_exists:
            return -8;
        default:
            return -1;
    }
};

module.exports.errors = {
    generic: {
        rawError: "Error: "
    },
    dbGenericError: {
        rawError: "DB Error: "
    },
    userNotFound: {
        rawError: "User not found: "
    },
    notFound: {
        rawError: "Object not found: "
    },
    user_exists: {
        rawError: "User exists: "
    },
    unauthorized:{
        rawError: "Unauthorized: "
    },
    validation:{
        rawError: "Validation errors: "
    },
    object_exists:{
        rawError: "Object exists: "
    }
};

module.exports.responseWithError = function (err, key, req) {
    let error = module.exports.errors[key];
    if (!error) {
        error = module.exports.errors.generic;
    }
    error = JSON.parse(JSON.stringify(error));
    error.rawError = {
        reason: error.rawError || "",
        errorValues: err || "No related value"
    };
    error.errorCode = module.exports.errorCodes(key);
    error.localizedError = error.rawError;
    return error;
};
