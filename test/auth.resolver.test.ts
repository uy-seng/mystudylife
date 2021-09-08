import { decode } from "jsonwebtoken";
import { Connection } from "typeorm";
import { User } from "../src/entity";
import { loginMutation, registerMutation } from "./mutation";
import { createTestConnection } from "./utils/createTestConnection";
import { gqlTest } from "./utils/graphqlTestCall";

let connection: Connection;

beforeAll(async () => {
  connection = await createTestConnection();
});

afterAll(async () => {
  await connection.close();
});

describe("authentication resolver test", () => {
  it("connection is active", () => {
    expect(connection).toBeDefined();
  });

  it("register mutation", async () => {
    const testUser = {
      username: "senguy",
      email: "sengouy0@gmail.com",
      password: "123",
    };
    const registerSuccess = await gqlTest({
      source: registerMutation,
      variableValues: testUser,
    });
    expect(registerSuccess.data).toBeDefined();
    User.findOne({
      where: {
        email: testUser.email,
      },
    })
      .then((user) => {
        expect(user!.username).toEqual(testUser.username);
      })
      .catch((error) => console.log(error));
  });

  it("login mutation", async () => {
    const testUser = {
      email: "sengouy0@gmail.com",
      password: "123",
    };

    const loginSuccess = await gqlTest({
      source: loginMutation,
      variableValues: testUser,
    });
    expect(loginSuccess.data).toBeDefined();
    const token = loginSuccess.data!.login!.accessToken;
    const payload = decode(token, { json: true });
    expect(payload!.user!.email).toEqual(testUser.email);
  });
});
