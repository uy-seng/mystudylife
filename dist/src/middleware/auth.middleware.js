"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationGate = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const jsonwebtoken_1 = require("jsonwebtoken");
const entity_1 = require("src/entity");
const typeorm_1 = require("typeorm");
const authenticationGate = async ({ context }, next) => {
    if (!context.req.headers.authorization)
        throw new apollo_server_errors_1.AuthenticationError("user is not authenticated");
    const accessToken = context.req.headers.authorization.split(" ")[1];
    try {
        const decodedPayload = (0, jsonwebtoken_1.verify)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        context.user = decodedPayload.user;
        const userRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.User);
        const user = await userRepository.findOne(decodedPayload.user.id);
        if ((user === null || user === void 0 ? void 0 : user.tokenVersion) !== decodedPayload.user.tokenVersion)
            throw new apollo_server_errors_1.AuthenticationError("user session has expired");
    }
    catch (e) {
        throw new apollo_server_errors_1.AuthenticationError(e.message);
    }
    return next();
};
exports.authenticationGate = authenticationGate;
//# sourceMappingURL=auth.middleware.js.map