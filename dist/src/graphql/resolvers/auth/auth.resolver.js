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
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware, } from "type-graphql";
import bcrypt from "bcryptjs";
import { AuthenticationError, ValidationError } from "apollo-server-errors";
import { getConnection, QueryFailedError } from "typeorm";
import { LoginResponse } from "./types/auth";
import { User } from "../../../entity";
import { createAccessToken, sendRefreshToken, createRefreshToken, } from "../../../helper";
import { authenticationGate } from "../../../middleware";
var AuthResolver = (function () {
    function AuthResolver() {
    }
    AuthResolver.prototype.register = function (username, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, userRepository, user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, bcrypt.hash(password, 12)];
                    case 1:
                        hashedPassword = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4, getConnection(process.env.NODE_ENV).getRepository(User)];
                    case 3:
                        userRepository = _a.sent();
                        user = userRepository.create({
                            email: email,
                            username: username,
                            password: hashedPassword,
                        });
                        return [4, userRepository.save(user)];
                    case 4:
                        _a.sent();
                        return [2, true];
                    case 5:
                        e_1 = _a.sent();
                        switch (e_1.constructor) {
                            case QueryFailedError:
                                if (e_1.code === "23505")
                                    return [2, new ValidationError("email or username already exist")];
                                else
                                    return [2, e_1];
                            default:
                                console.log(e_1);
                                return [2, e_1];
                        }
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    AuthResolver.prototype.login = function (email, password, _a) {
        var res = _a.res;
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user, validPassword, userPayload, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, getConnection(process.env.NODE_ENV).getRepository(User)];
                    case 1:
                        userRepository = _b.sent();
                        return [4, userRepository.findOne({
                                where: {
                                    email: email,
                                },
                            })];
                    case 2:
                        user = _b.sent();
                        if (!user)
                            return [2, new AuthenticationError("invalid credentials")];
                        return [4, bcrypt.compare(password, user.password)];
                    case 3:
                        validPassword = _b.sent();
                        if (!validPassword)
                            throw new AuthenticationError("invalid credentails");
                        userPayload = {
                            id: user.id,
                            email: user.email,
                            username: user.username,
                            tokenVersion: user.tokenVersion,
                        };
                        response = {
                            accessToken: createAccessToken(userPayload),
                        };
                        sendRefreshToken(res, createRefreshToken(userPayload));
                        return [2, response];
                }
            });
        });
    };
    AuthResolver.prototype.me = function (_a) {
        var user = _a.user;
        return user;
    };
    AuthResolver.prototype.logout = function (_a) {
        var res = _a.res;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                sendRefreshToken(res, "");
                return [2, true];
            });
        });
    };
    __decorate([
        Mutation(function () { return Boolean; }, { nullable: true }),
        __param(0, Arg("username")),
        __param(1, Arg("email")),
        __param(2, Arg("password")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String]),
        __metadata("design:returntype", Promise)
    ], AuthResolver.prototype, "register", null);
    __decorate([
        Mutation(function () { return LoginResponse; }),
        __param(0, Arg("email")),
        __param(1, Arg("password")),
        __param(2, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, Object]),
        __metadata("design:returntype", Promise)
    ], AuthResolver.prototype, "login", null);
    __decorate([
        Query(function () { return User; }),
        UseMiddleware(authenticationGate),
        __param(0, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", User)
    ], AuthResolver.prototype, "me", null);
    __decorate([
        Mutation(function () { return Boolean; }),
        UseMiddleware(authenticationGate),
        __param(0, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthResolver.prototype, "logout", null);
    AuthResolver = __decorate([
        Resolver()
    ], AuthResolver);
    return AuthResolver;
}());
export { AuthResolver };
//# sourceMappingURL=auth.resolver.js.map