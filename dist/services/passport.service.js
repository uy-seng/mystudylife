"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportService = void 0;
const passport_1 = __importDefault(require("passport"));
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const uuid_1 = require("uuid");
class PassportService {
    constructor(app) {
        this.passport = passport_1.default;
        this.app = app;
        this.app.use(this.passport.initialize());
        this.passport.serializeUser((user, done) => {
            done(null, user.id);
        });
        this.passport.deserializeUser(async (id, done) => {
            const user = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                .getRepository(entity_1.User)
                .findOne(id);
            done(null, user);
        });
    }
    initGoogleOAuthStrategy() {
        this.passport.use(new passport_google_oauth20_1.default.Strategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/oauth/google/callback",
        }, async (_accessToken, _refreshToken, profile, done) => {
            const user = await await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                .getRepository(entity_1.User)
                .findOne({
                relations: ["provider"],
                where: {
                    email: profile.emails[0].value,
                },
            });
            if (user) {
                if (!user.provider.id) {
                    user.provider.id = profile.id;
                    user.provider.name = "google";
                    await await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                        .getRepository(entity_1.User)
                        .save(user);
                }
                done(null, user);
            }
            else {
                const newUserProvider = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                    .getRepository(entity_1.UserProvider)
                    .create({
                    id: profile.id,
                    name: "google",
                });
                await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                    .getRepository(entity_1.UserProvider)
                    .save(newUserProvider);
                const newUser = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                    .getRepository(entity_1.User)
                    .create({
                    email: profile.emails[0].value,
                    username: profile.displayName.concat((0, uuid_1.v4)().split("-")[0]),
                    userProviderId: profile.id,
                });
                await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                    .getRepository(entity_1.User)
                    .save(newUser);
                done(null, newUser);
            }
        }));
    }
    initFacebookOAuthStrategy() {
        this.passport.use(new passport_facebook_1.default.Strategy({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: "https://mystudylife-clone-useng.herokuapp.com/oauth/facebook/callback",
        }, async (_accessToken, _refreshToken, profile, done) => {
            const user = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                .getRepository(entity_1.User)
                .findOne({
                relations: ["provider"],
                where: {
                    provider: {
                        id: profile.id,
                    },
                },
            });
            if (user) {
                done(null, user);
            }
            else {
                const newUserProvider = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                    .getRepository(entity_1.UserProvider)
                    .create({
                    id: profile.id,
                    name: "facebook",
                });
                await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                    .getRepository(entity_1.UserProvider)
                    .save(newUserProvider);
                const newUser = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                    .getRepository(entity_1.User)
                    .create({
                    username: profile.displayName.concat((0, uuid_1.v4)().split("-")[0]),
                    userProviderId: profile.id,
                });
                await await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
                    .getRepository(entity_1.User)
                    .save(newUser);
                done(null, newUser);
            }
        }));
    }
}
exports.PassportService = PassportService;
//# sourceMappingURL=passport.service.js.map