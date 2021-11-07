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
import faker from "faker";
import { GraphQLError } from "graphql";
import { decode } from "jsonwebtoken";
import { User } from "../../../entity";
import { createRefreshToken, createAccessToken } from "../../../helper";
import { getConnection } from "typeorm";
import { testClient, getCookies, cookie, } from "../../../../test/graphqlTestClient";
var testUser = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
};
var registerMutation = "\n    mutation RegisterMutation($username: String!, $email: String!, $password: String!) {\n        register(username: $username, email: $email, password: $password)\n    }\n";
var loginMutation = "\n    mutation LoginMutation($email: String!, $password: String!){\n      login(email: $email, password: $password){\n        accessToken\n      }\n    }\n";
var meQuery = "\n    query meQuery{\n      me{\n        id\n        username\n        email\n      }\n    }\n";
describe("registration functionality", function () {
    it("should register user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: registerMutation,
                        variableValues: {
                            username: testUser.username,
                            email: testUser.email,
                            password: testUser.password,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data.register).not.toBeNull();
                    return [2];
            }
        });
    }); });
    it("should have registered user in database", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userRepository, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepository = getConnection(process.env.NODE_ENV).getRepository(User);
                    return [4, userRepository.findOne({
                            where: {
                                email: testUser.email,
                            },
                        })];
                case 1:
                    user = _a.sent();
                    expect(user).toBeDefined();
                    return [2];
            }
        });
    }); });
});
describe("registration error validation", function () {
    it("should return duplicate error when register", function () { return __awaiter(void 0, void 0, void 0, function () {
        var anotherUser, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    anotherUser = {
                        username: testUser.username,
                        email: faker.internet.email(),
                        password: faker.internet.password(),
                    };
                    return [4, testClient({
                            source: registerMutation,
                            variableValues: {
                                username: anotherUser.username,
                                email: anotherUser.email,
                                password: anotherUser.password,
                            },
                        })];
                case 1:
                    response = _a.sent();
                    expect(response.errors[0]).toEqual(new GraphQLError("email or username already exist"));
                    expect(response.data.register).toBeNull();
                    return [2];
            }
        });
    }); });
});
describe("login functionality", function () {
    var accessToken;
    it("should login user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: loginMutation,
                        variableValues: {
                            email: testUser.email,
                            password: testUser.password,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data.login).not.toBeNull();
                    accessToken = response.data.login.accessToken;
                    expect(accessToken).toBeDefined();
                    return [2];
            }
        });
    }); });
    it("should return authenticated user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: meQuery,
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data.me).not.toBeNull();
                    return [2];
            }
        });
    }); });
    it("should have refresh token cookie", function () { return __awaiter(void 0, void 0, void 0, function () {
        var cookies;
        return __generator(this, function (_a) {
            cookies = getCookies();
            expect(cookies).toHaveProperty("jid");
            return [2];
        });
    }); });
    var oldAccessToken;
    it("should return new refresh token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var cookies, jid, userPayload, userRepository, user, oldTokenVersion, newCookies, newJid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cookies = getCookies();
                    jid = cookies.jid;
                    userPayload = decode(jid);
                    userRepository = getConnection(process.env.NODE_ENV).getRepository(User);
                    return [4, userRepository.findOne(userPayload.id)];
                case 1:
                    user = (_a.sent());
                    oldTokenVersion = user.tokenVersion;
                    user.tokenVersion++;
                    return [4, userRepository.save(user)];
                case 2:
                    _a.sent();
                    expect(user.tokenVersion).toEqual(oldTokenVersion + 1);
                    cookie("jid", createRefreshToken(user), {});
                    newCookies = getCookies();
                    newJid = newCookies.jid;
                    oldAccessToken = accessToken;
                    accessToken = createAccessToken(user);
                    expect(jid).not.toEqual(newJid);
                    return [2];
            }
        });
    }); });
    it("should return user session expired error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: meQuery,
                        headers: {
                            authorization: "Bearer " + oldAccessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.data).toBeNull();
                    expect(response.errors[0]).toEqual(new GraphQLError("user session has expired"));
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=auth.resolver.test.js.map