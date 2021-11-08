"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncForEach = exports.isValidDateFormat = exports.timeTransformer = exports.dateTransformer = exports.sendRefreshToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const auth_utils_1 = require("./auth.utils");
Object.defineProperty(exports, "createAccessToken", { enumerable: true, get: function () { return auth_utils_1.createAccessToken; } });
Object.defineProperty(exports, "createRefreshToken", { enumerable: true, get: function () { return auth_utils_1.createRefreshToken; } });
Object.defineProperty(exports, "sendRefreshToken", { enumerable: true, get: function () { return auth_utils_1.sendRefreshToken; } });
const date_utils_1 = require("./date.utils");
Object.defineProperty(exports, "dateTransformer", { enumerable: true, get: function () { return date_utils_1.dateTransformer; } });
Object.defineProperty(exports, "timeTransformer", { enumerable: true, get: function () { return date_utils_1.timeTransformer; } });
const validate_utils_1 = require("./validate.utils");
Object.defineProperty(exports, "isValidDateFormat", { enumerable: true, get: function () { return validate_utils_1.isValidDateFormat; } });
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index);
    }
}
exports.asyncForEach = asyncForEach;
//# sourceMappingURL=index.js.map