import faker from "faker";
import { GraphQLError } from "graphql";
import { decode } from "jsonwebtoken";
import { User } from "src/entity";
import { createRefreshToken, createAccessToken } from "src/helper";
import { getConnection } from "typeorm";

import {
  testClient,
  getCookies,
  cookie,
} from "../../../../test/graphqlTestClient";
import { UserPayload } from "./types";

const testUser = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
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
        provider
      }
    }
`;

describe("registration functionality", () => {
  it("should register user", async () => {
    const response = await testClient({
      source: registerMutation,
      variableValues: {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data!.register).not.toBeNull();
  });

  it("should have registered user in database", async () => {
    const userRepository = getConnection(process.env.NODE_ENV).getRepository(
      User
    );
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
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await testClient({
      source: registerMutation,
      variableValues: {
        username: anotherUser.username,
        email: anotherUser.email,
        password: anotherUser.password,
      },
    });
    expect(response.errors![0]).toEqual(
      new GraphQLError("email or username already exist")
    );
    expect(response.data!.register).toBeNull();
  });
});

describe("login functionality", () => {
  let accessToken: string;

  it("should login user", async () => {
    const response = await testClient({
      source: loginMutation,
      variableValues: {
        email: testUser.email,
        password: testUser.password,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data!.login).not.toBeNull();
    accessToken = response.data!.login!.accessToken;
    expect(accessToken).toBeDefined();
  });

  it("should return authenticated user", async () => {
    const response = await testClient({
      source: meQuery,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data!.me).not.toBeNull();
  });

  it("should have refresh token cookie", async () => {
    const cookies = getCookies();
    expect(cookies).toHaveProperty("jid");
  });

  let oldAccessToken: string;
  it("should return new refresh token", async () => {
    const cookies = getCookies() as any;
    const jid = cookies!.jid;
    const userPayload = decode(jid) as UserPayload;
    const userRepository = getConnection(process.env.NODE_ENV).getRepository(
      User
    );
    let user = (await userRepository.findOne(userPayload.id)) as User;
    const oldTokenVersion = user!.tokenVersion;
    user!.tokenVersion++;
    await userRepository.save(user);
    expect(user!.tokenVersion).toEqual(oldTokenVersion + 1);
    cookie("jid", createRefreshToken(user as User), {});
    const newCookies = getCookies() as any;
    const newJid = newCookies!.jid;
    oldAccessToken = accessToken;
    accessToken = createAccessToken(user);
    expect(jid).not.toEqual(newJid);
  });

  it("should return user session expired error", async () => {
    const response = await testClient({
      source: meQuery,
      headers: {
        authorization: `Bearer ${oldAccessToken}`,
      },
    });
    expect(response.data).toBeNull();
    expect(response.errors![0]).toEqual(
      new GraphQLError("user session has expired")
    );
  });
});
