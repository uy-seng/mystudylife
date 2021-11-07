import { sign } from "jsonwebtoken";
export var createAccessToken = function (user) {
    return sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};
export var createRefreshToken = function (user) {
    return sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
export var sendRefreshToken = function (res, cookie) {
    res.cookie("jid", cookie, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
//# sourceMappingURL=auth.utils.js.map