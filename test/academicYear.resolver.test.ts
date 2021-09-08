import {
  getAccessToken,
  gqlTest,
  setAccessToken,
} from "./utils/graphqlTestCall";
import { Connection } from "typeorm";
import { createTestConnection } from "./utils/createTestConnection";
import faker from "faker";
import {
  createNewAcademicYearMutation,
  loginMutation,
  registerMutation,
} from "./mutation";
import { AcademicYear } from "../src/entity";

let connection: Connection;
let email: string = faker.internet.email();
let username: string = faker.internet.userName();
let password: string = faker.internet.password();

beforeAll(async () => {
  connection = await createTestConnection();
  try {
    await gqlTest({
      source: registerMutation,
      variableValues: {
        email: email,
        username: username,
        password: password,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("cannot register");
  }

  try {
    const response = await gqlTest({
      source: loginMutation,
      variableValues: {
        email: email,
        password: password,
      },
    });
    setAccessToken(response.data!.login!.accessToken);
  } catch (error) {
    console.log(error);
    throw new Error("cannot login");
  }
});

afterAll(async () => {
  await connection.close();
  // clear access token
  setAccessToken(undefined);
});

describe("academic year resolver", () => {
  it("connection is active", () => {
    expect(connection).toBeDefined();
  });

  it("access token is defined", () => {
    expect(getAccessToken()).toBeDefined();
  });

  it("create new academic year fixed schedule", async () => {
    const testAcademicYear = {
      startDate: "September 07 2021",
      endDate: "March 07 2022",
      schedulingType: "fixed",
      terms: null,
      dayRotationSchedules: null,
      weekRotationSchedules: null,
    };
    const response = await gqlTest({
      source: createNewAcademicYearMutation,
      variableValues: {
        ...testAcademicYear,
      },
    });
    expect(response.data).toBeDefined();
  });

  it("create new academic year week rotation schedule", async () => {
    const testAcademicYear = {
      startDate: "September 07 2021",
      endDate: "March 07 2022",
      schedulingType: "week_rotation",
      terms: null,
      dayRotationSchedules: null,
      weekRotationSchedule: {
        numOfWeek: 2,
        startWeek: 1,
      },
    };
    const response = await gqlTest({
      source: createNewAcademicYearMutation,
      variableValues: {
        ...testAcademicYear,
      },
    });
    expect(response.data).toBeDefined();
    const academicYearId = response.data!.createNewAcademicYear!.id;
    AcademicYear.findOne(academicYearId, {
      relations: ["weekRotationSchedule"],
    })
      .then((academicYear) => {
        expect(academicYear).toHaveProperty("weekRotationSchedule");
      })
      .catch((error) => console.log(error));
  });

  it("create new academic year day rotation schedule", async () => {
    const testAcademicYear = {
      startDate: "September 07 2021",
      endDate: "March 07 2022",
      schedulingType: "day_rotation",
      terms: null,
      dayRotationSchedules: {
        numOfDay: 6,
        startDay: 1,
        repeatDays: [1, 2, 3, 4, 5],
      },
      weekRotationSchedule: null,
    };
    const response = await gqlTest({
      source: createNewAcademicYearMutation,
      variableValues: {
        ...testAcademicYear,
      },
    });
    expect(response.data).toBeDefined();

    const academicYearId = response.data!.createNewAcademicYear!.id;
    AcademicYear.findOne(academicYearId, {
      relations: ["dayRotationSchedules"],
    })
      .then((academicYear) =>
        expect(academicYear).toHaveProperty("dayRotationSchedules")
      )
      .catch((error) => console.log(error));
  });
});
