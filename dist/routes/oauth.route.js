"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthRoute = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const helper_1 = require("../helper");
exports.oauthRoute = express_1.default.Router();
exports.oauthRoute.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
exports.oauthRoute.get("/google/callback", passport_1.default.authenticate("google", {
    session: false,
    successRedirect: "/dashboard",
}), (req, res) => {
    console.log((0, helper_1.createRefreshToken)(req.user));
    (0, helper_1.sendRefreshToken)(res, (0, helper_1.createRefreshToken)(req.user));
});
exports.oauthRoute.get("/facebook", passport_1.default.authenticate("facebook"));
exports.oauthRoute.get("/facebook/callback", passport_1.default.authenticate("facebook", {
    session: false,
}), (req, res) => {
    (0, helper_1.sendRefreshToken)(res, (0, helper_1.createRefreshToken)(req.user));
    console.log(req.user);
    return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
});
//# sourceMappingURL=oauth.route.js.map