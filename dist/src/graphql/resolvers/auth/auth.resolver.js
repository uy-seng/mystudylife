"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const apollo_server_errors_1 = require("apollo-server-errors");
const typeorm_1 = require("typeorm");
const auth_1 = require("./types/auth");
const entity_1 = require("src/entity");
const helper_1 = require("src/helper");
const middleware_1 = require("src/middleware");
let AuthResolver = class AuthResolver {
    async register(username, email, password) {
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        try {
            const userRepository = await (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.User);
            const user = userRepository.create({
                email: email,
                username: username,
                password: hashedPassword,
            });
            await userRepository.save(user);
            return true;
        }
        catch (e) {
            switch (e.constructor) {
                case typeorm_1.QueryFailedError:
                    if (e.code === "23505")
                        return new apollo_server_errors_1.ValidationError("email or username already exist");
                    else
                        return e;
                default:
                    console.log(e);
                    return e;
            }
        }
    }
    async login(email, password, { res }) {
        const userRepository = await (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.User);
        const user = await userRepository.findOne({
            where: {
                email: email,
            },
        });
        if (!user)
            return new apollo_server_errors_1.AuthenticationError("invalid credentials");
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword)
            throw new apollo_server_errors_1.AuthenticationError("invalid credentails");
        const userPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            tokenVersion: user.tokenVersion,
        };
        const response = {
            accessToken: (0, helper_1.createAccessToken)(userPayload),
        };
        (0, helper_1.sendRefreshToken)(res, (0, helper_1.createRefreshToken)(userPayload));
        return response;
    }
    me({ user }) {
        return user;
    }
    async logout({ res }) {
        (0, helper_1.sendRefreshToken)(res, "");
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("username")),
    __param(1, (0, type_graphql_1.Arg)("email")),
    __param(2, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => auth_1.LoginResponse),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Query)(() => entity_1.User),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", entity_1.User)
], AuthResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
AuthResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map