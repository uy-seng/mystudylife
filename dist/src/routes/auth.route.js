"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const passport_1 = __importDefault(require("passport"));
const entity_1 = require("src/entity");
const helper_1 = require("src/helper");
const typeorm_1 = require("typeorm");
exports.authRoute = (0, express_1.Router)();
exports.authRoute.get("/refresh-token", async (req, res) => {
    const cookie = req.cookies.jid;
    const userRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.User);
    const NULL_TOKEN = {
        accessToken: "",
    };
    if (!cookie)
        return res.status(200).json(NULL_TOKEN);
    const userPayload = (0, jsonwebtoken_1.decode)(cookie);
    const user = await userRepository.findOne(userPayload.user.id);
    if (!user)
        return res.status(200).json(NULL_TOKEN);
    if (userPayload.user.tokenVersion !== user.tokenVersion)
        return res.status(200).json(NULL_TOKEN);
    await userRepository.increment({
        id: userPayload.user.id,
    }, "tokenVersion", 1);
    userPayload.user.tokenVersion++;
    (0, helper_1.sendRefreshToken)(res, (0, helper_1.createRefreshToken)(userPayload.user));
    return res.status(200).json({
        accessToken: (0, helper_1.createAccessToken)(userPayload.user),
    });
});
exports.authRoute.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
exports.authRoute.get("/google/callback", passport_1.default.authenticate("google", {
    session: false,
}), (_req, res) => {
    return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
});
exports.authRoute.get("/facebook", passport_1.default.authenticate("facebook"));
exports.authRoute.get("/facebook/callback", passport_1.default.authenticate("facebook", {
    session: false,
}), (_req, res) => {
    return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
});
//# sourceMappingURL=auth.route.js.map