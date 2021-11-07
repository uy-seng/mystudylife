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
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware, } from "type-graphql";
import bcrypt from "bcryptjs";
import { AuthenticationError, ValidationError } from "apollo-server-errors";
import { getConnection, QueryFailedError } from "typeorm";
import { LoginResponse } from "./types/auth";
import { User } from "../../../entity";
import { createAccessToken, sendRefreshToken, createRefreshToken, } from "../../../helper";
import { authenticationGate } from "../../../middleware";
let AuthResolver = class AuthResolver {
    async register(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        try {
            const userRepository = await getConnection(process.env.NODE_ENV).getRepository(User);
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
                case QueryFailedError:
                    if (e.code === "23505")
                        return new ValidationError("email or username already exist");
                    else
                        return e;
                default:
                    console.log(e);
                    return e;
            }
        }
    }
    async login(email, password, { res }) {
        const userRepository = await getConnection(process.env.NODE_ENV).getRepository(User);
        const user = await userRepository.findOne({
            where: {
                email: email,
            },
        });
        if (!user)
            return new AuthenticationError("invalid credentials");
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            throw new AuthenticationError("invalid credentails");
        const userPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            tokenVersion: user.tokenVersion,
        };
        const response = {
            accessToken: createAccessToken(userPayload),
        };
        sendRefreshToken(res, createRefreshToken(userPayload));
        return response;
    }
    me({ user }) {
        return user;
    }
    async logout({ res }) {
        sendRefreshToken(res, "");
        return true;
    }
};
__decorate([
    Mutation(() => Boolean, { nullable: true }),
    __param(0, Arg("username")),
    __param(1, Arg("email")),
    __param(2, Arg("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    Mutation(() => LoginResponse),
    __param(0, Arg("email")),
    __param(1, Arg("password")),
    __param(2, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    Query(() => User),
    UseMiddleware(authenticationGate),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", User)
], AuthResolver.prototype, "me", null);
__decorate([
    Mutation(() => Boolean),
    UseMiddleware(authenticationGate),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
AuthResolver = __decorate([
    Resolver()
], AuthResolver);
export { AuthResolver };
//# sourceMappingURL=auth.resolver.js.map