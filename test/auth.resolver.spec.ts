import { gqlTest } from "./utils/graphqlTestCall";
import faker from "faker";
import { registerMutation } from "./mutation";
import { createTestConnection } from "./utils/createTestConnection";
import { Connection } from "typeorm";
import { ValidationError } from "apollo-server-errors";

let connection: Connection;

beforeAll(async () => {
  connection = await createTestConnection();
});

afterAll(async () => {
  await connection.close();
});

describe("authentication resolver specification", () => {
  it("connection is active", () => {
    expect(connection).toBeDefined();
  });

  it("should throw duplicate username error", async () => {
    const username = faker.internet.userName();

    const testUser = {
      username: username,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const registerSuccess = await gqlTest({
      source: registerMutation,
      variableValues: {
        ...testUser,
      },
    });
    expect(registerSuccess.data).toBeDefined();

    const duplicateUser = {
      username: username,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const registerFail = await gqlTest({
      source: registerMutation,
      variableValues: {
        ...duplicateUser,
      },
    });
    expect(registerFail.errors![0]).toEqual(
      new ValidationError(`Key (username)=(${username}) already exists.`)
    );
  });

  it("should throw duplicate email error", async () => {
    const email = faker.internet.email();

    const testUser = {
      username: faker.internet.userName(),
      email: email,
      password: faker.internet.password(),
    };
    const registerSuccess = await gqlTest({
      source: registerMutation,
      variableValues: {
        ...testUser,
      },
    });
    expect(registerSuccess.data).toBeDefined();

    const duplicateUser = {
      username: faker.internet.userName(),
      email: email,
      password: faker.internet.password(),
    };

    const registerFail = await gqlTest({
      source: registerMutation,
      variableValues: {
        ...duplicateUser,
      },
    });

    expect(registerFail.errors![0]).toEqual(
      new ValidationError(`Key (email)=(${email}) already exists.`)
    );
  });
});
