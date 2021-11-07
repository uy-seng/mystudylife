"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
const graphql_1 = require("graphql");
const jsonwebtoken_1 = require("jsonwebtoken");
const entity_1 = require("src/entity");
const helper_1 = require("src/helper");
const typeorm_1 = require("typeorm");
const graphqlTestClient_1 = require("../../../../test/graphqlTestClient");
const testUser = {
    username: faker_1.default.internet.userName(),
    email: faker_1.default.internet.email(),
    password: faker_1.default.internet.password(),
};
const registerMutation = `
    mutation RegisterMutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password)
    }
`;
const loginMutation = `
    mutation LoginMutation($email: String!, $password: String!){
      login(email: $email, password: $password){
        accessToken
      }
    }
`;
const meQuery = `
    query meQuery{
      me{
        id
        username
        email
      }
    }
`;
describe("registration functionality", () => {
    it("should register user", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: registerMutation,
            variableValues: {
                username: testUser.username,
                email: testUser.email,
                password: testUser.password,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data.register).not.toBeNull();
    });
    it("should have registered user in database", async () => {
        const userRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.User);
        const user = await userRepository.findOne({
            where: {
                email: testUser.email,
            },
        });
        expect(user).toBeDefined();
    });
});
describe("registration error validation", () => {
    it("should return duplicate error when register", async () => {
        const anotherUser = {
            username: testUser.username,
            email: faker_1.default.internet.email(),
            password: faker_1.default.internet.password(),
        };
        const response = await (0, graphqlTestClient_1.testClient)({
            source: registerMutation,
            variableValues: {
                username: anotherUser.username,
                email: anotherUser.email,
                password: anotherUser.password,
            },
        });
        expect(response.errors[0]).toEqual(new graphql_1.GraphQLError("email or username already exist"));
        expect(response.data.register).toBeNull();
    });
});
describe("login functionality", () => {
    let accessToken;
    it("should login user", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: loginMutation,
            variableValues: {
                email: testUser.email,
                password: testUser.password,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data.login).not.toBeNull();
        accessToken = response.data.login.accessToken;
        expect(accessToken).toBeDefined();
    });
    it("should return authenticated user", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: meQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data.me).not.toBeNull();
    });
    it("should have refresh token cookie", async () => {
        const cookies = (0, graphqlTestClient_1.getCookies)();
        expect(cookies).toHaveProperty("jid");
    });
    let oldAccessToken;
    it("should return new refresh token", async () => {
        const cookies = (0, graphqlTestClient_1.getCookies)();
        const jid = cookies.jid;
        const userPayload = (0, jsonwebtoken_1.decode)(jid);
        const userRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.User);
        let user = (await userRepository.findOne(userPayload.id));
        const oldTokenVersion = user.tokenVersion;
        user.tokenVersion++;
        await userRepository.save(user);
        expect(user.tokenVersion).toEqual(oldTokenVersion + 1);
        (0, graphqlTestClient_1.cookie)("jid", (0, helper_1.createRefreshToken)(user), {});
        const newCookies = (0, graphqlTestClient_1.getCookies)();
        const newJid = newCookies.jid;
        oldAccessToken = accessToken;
        accessToken = (0, helper_1.createAccessToken)(user);
        expect(jid).not.toEqual(newJid);
    });
    it("should return user session expired error", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: meQuery,
            headers: {
                authorization: `Bearer ${oldAccessToken}`,
            },
        });
        expect(response.data).toBeNull();
        expect(response.errors[0]).toEqual(new graphql_1.GraphQLError("user session has expired"));
    });
});
//# sourceMappingURL=auth.resolver.test.js.map