import { sign } from "jsonwebtoken";
export const createAccessToken = (user) => {
    return sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};
export const createRefreshToken = (user) => {
    return sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
export const sendRefreshToken = (res, cookie) => {
    res.cookie("jid", cookie, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
//# sourceMappingURL=auth.utils.js.map