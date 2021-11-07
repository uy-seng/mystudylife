var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Router } from "express";
import { decode } from "jsonwebtoken";
import passport from "passport";
import { User } from "../entity";
import { createAccessToken, createRefreshToken, sendRefreshToken, } from "../helper";
import { getConnection } from "typeorm";
export var authRoute = Router();
authRoute.get("/refresh-token", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cookie, userRepository, NULL_TOKEN, userPayload, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cookie = req.cookies.jid;
                userRepository = getConnection(process.env.NODE_ENV).getRepository(User);
                NULL_TOKEN = {
                    accessToken: "",
                };
                if (!cookie)
                    return [2, res.status(200).json(NULL_TOKEN)];
                userPayload = decode(cookie);
                return [4, userRepository.findOne(userPayload.user.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2, res.status(200).json(NULL_TOKEN)];
                if (userPayload.user.tokenVersion !== user.tokenVersion)
                    return [2, res.status(200).json(NULL_TOKEN)];
                return [4, userRepository.increment({
                        id: userPayload.user.id,
                    }, "tokenVersion", 1)];
            case 2:
                _a.sent();
                userPayload.user.tokenVersion++;
                sendRefreshToken(res, createRefreshToken(userPayload.user));
                return [2, res.status(200).json({
                        accessToken: createAccessToken(userPayload.user),
                    })];
        }
    });
}); });
authRoute.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));
authRoute.get("/google/callback", passport.authenticate("google", {
    session: false,
}), function (_req, res) {
    return res.redirect(process.env.CLIENT_URL + "/dashboard");
});
authRoute.get("/facebook", passport.authenticate("facebook"));
authRoute.get("/facebook/callback", passport.authenticate("facebook", {
    session: false,
}), function (_req, res) {
    return res.redirect(process.env.CLIENT_URL + "/dashboard");
});
//# sourceMappingURL=auth.route.js.map