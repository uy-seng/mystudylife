import { AuthenticationError } from "apollo-server-errors";
import { verify } from "jsonwebtoken";
import { User } from "../entity";
import { getConnection } from "typeorm";
export const authenticationGate = async ({ context }, next) => {
    if (!context.req.headers.authorization)
        throw new AuthenticationError("user is not authenticated");
    const accessToken = context.req.headers.authorization.split(" ")[1];
    try {
        const decodedPayload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        context.user = decodedPayload.user;
        const userRepository = getConnection(process.env.NODE_ENV).getRepository(User);
        const user = await userRepository.findOne(decodedPayload.user.id);
        if ((user === null || user === void 0 ? void 0 : user.tokenVersion) !== decodedPayload.user.tokenVersion)
            throw new AuthenticationError("user session has expired");
    }
    catch (e) {
        throw new AuthenticationError(e.message);
    }
    return next();
};
//# sourceMappingURL=auth.middleware.js.map