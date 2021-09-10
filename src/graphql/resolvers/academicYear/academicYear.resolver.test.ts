import faker from "faker";
import { User } from "src/entity";
import { getConnection } from "typeorm";
import { testClient } from "../../../../test/graphqlTestClient";

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

const createNewAcademicYearMutation = `
    mutation createNewAcademicYearMutation(
        $startDate: String!,
        $endDate: String!,
        $schedulingType: schedulingType!,
        $terms: [AcademicYearTermInputType!],
        $dayRotationSchedule: AcademicYearDayRotationScheduleInputType,
        $weekRotationSchedule: AcademicYearWeekRotationScheduleInputType
        ) {
        createNewAcademicYear(
            startDate: $startDate,
            endDate: $endDate,
            schedulingType: $schedulingType,
            terms: $terms,
            dayRotationSchedule: $dayRotationSchedule,
            weekRotationSchedule: $weekRotationSchedule
            ){
                id
        }
    }
`;

let accessToken: string;

describe("user authentication process", () => {
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

  it("user should now be authenticated", () => {
    expect(accessToken).toBeDefined();
  });
});

describe("create new academic year functionailty test", () => {
  it("should create academic year with fixed schedule", async () => {
    const response = await testClient({
      source: createNewAcademicYearMutation,
      variableValues: {
        startDate: faker.date.recent().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        endDate: faker.date.future(2).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        schedulingType: "fixed",
        terms: null,
        dayRotationSchedule: null,
        weekRotationSchedule: null,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data!.createNewAcademicYear).not.toBeNull();

    const userRepository = getConnection(process.env.NODE_ENV).getRepository(
      User
    );
    const user = await userRepository.findOne(
      { email: testUser.email },
      {
        relations: ["academicYears"],
      }
    );
    expect(user).toHaveProperty("academicYears");
    expect(
      user!.academicYears.find(
        (academicYear) => academicYear.schedulingType === "fixed"
      )
    ).toBeDefined();
  });

  it("should create academic year with week rotation schedule", async () => {
    const response = await testClient({
      source: createNewAcademicYearMutation,
      variableValues: {
        startDate: faker.date.recent().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        endDate: faker.date.future(2).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        schedulingType: "week_rotation",
        terms: null,
        dayRotationSchedule: null,
        weekRotationSchedule: {
          numOfWeek: 2,
          startWeek: 1,
        },
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data!.createNewAcademicYear).not.toBeNull();

    const userRepository = getConnection(process.env.NODE_ENV).getRepository(
      User
    );
    const user = await userRepository.findOne(
      { email: testUser.email },
      {
        relations: ["academicYears"],
      }
    );
    expect(user).toHaveProperty("academicYears");
    expect(
      user!.academicYears.find(
        (academicYear) => academicYear.schedulingType === "fixed"
      )
    ).toBeDefined();
  });

  it("should create academic year with day rotation schedule", async () => {
    const response = await testClient({
      source: createNewAcademicYearMutation,
      variableValues: {
        startDate: faker.date.recent().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        endDate: faker.date.future(2).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        schedulingType: "day_rotation",
        terms: null,
        dayRotationSchedule: {
          startDay: 1,
          numOfDay: 2,
          repeatDays: [1, 2, 3, 4],
        },
        weekRotationSchedule: null,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data!.createNewAcademicYear).not.toBeNull();

    const userRepository = getConnection(process.env.NODE_ENV).getRepository(
      User
    );
    const user = await userRepository.findOne(
      { email: testUser.email },
      {
        relations: ["academicYears"],
      }
    );
    expect(user).toHaveProperty("academicYears");
    expect(
      user!.academicYears.find(
        (academicYear) => academicYear.schedulingType === "fixed"
      )
    ).toBeDefined();
  });
});

describe("create new academic year specification test", () => {
  it("should return invalid week rotation schedule error for num of week", async () => {});
  it("should return invalid week rotation schedule error for start week", async () => {});
  it("should return invalid day rotation schedule error for duplicate repeatDays", async () => {});
});
