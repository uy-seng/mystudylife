/**
 * functionality test
 *
 * 1. create 3 uuid
 * 2. test academic year schedule resolver functionality
 *    - create fixed schedule (test case 1)
 *    - create week rotation schedule (test case 2)
 *    - create day rotation schedule (test case 3)
 * 3. test academic year term resolver functionality
 *    - create term (test case 1)
 * 4. test academic year
 *    - create academic year with fixed schedule with term (test case 1)
 *    - create academic year with week rotation schedule (test case 2)
 *    - create academic year with day rotation schedule (test case 3)
 */
import {
  AcademicYear,
  AcademicYearSchedule,
  Term,
  WeekRotationSchedule,
} from "src/entity";
import {
  loginMutation,
  newAcademicYearMutation,
  newPartialDayRotationMutation,
  newPartialWeekRotationMutation,
  newScheduleMutation,
  newTermMutation,
  registerMutation,
} from "src/graphql/mutation";
import { deleteAcademicYearMutation } from "src/graphql/mutation/academicYear";
import { getAcademicYearsQuery, meQuery } from "src/graphql/query";
import { getConnection } from "typeorm";
import { testClient } from "../../../../test/graphqlTestClient";
import faker from "faker";

const testUser = {
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

/**
 * user setup
 */
let accessToken: string;
describe("setting up user account", () => {
  it("should create new account for user", async () => {
    const response = await testClient({
      source: registerMutation,
      variableValues: {
        email: testUser.email,
        username: testUser.username,
        password: testUser.password,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
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
    expect(response.data).not.toBeNull();
    accessToken = response.data!.login!.accessToken;
  });
  it("should show authenticated user", async () => {
    expect(accessToken).toBeDefined();
    const response = await testClient({
      source: meQuery,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
  });
});

/**
 * creating academic year with fixed schedule and term
 */
describe("test case 1: create academic year with fixed schedule and term", () => {
  let academicYearId: string;
  it("should create empty academic year", async () => {
    const response = await testClient({
      source: newAcademicYearMutation,
      variableValues: {
        startDate: "September 12 2021",
        endDate: "March 12 2022",
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    academicYearId = response.data!.newAcademicYear!.id;
  });

  let scheduleId: string;
  it("should create fixed schedule", async () => {
    const response = await testClient({
      source: newScheduleMutation,
      variableValues: {
        type: "fixed",
        academicYearId: academicYearId,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    scheduleId = response.data!.newSchedule!.id;
  });

  let termIds: string[];
  it("should create terms", async () => {
    const terms = [
      {
        name: "T1",
        startDate: "September 12 2021",
        endDate: "October 12 2021",
      },
      {
        name: "T2",
        startDate: "October 27 2021",
        endDate: "November 27 2021",
      },
      {
        name: "T3",
        startDate: "December 12 2021",
        endDate: "January 12 2022",
      },
      {
        name: "T4",
        startDate: "January 27 2022",
        endDate: "February 12 2022",
      },
    ];
    termIds = await Promise.all(
      terms.map(async (term) => {
        const response = await testClient({
          source: newTermMutation,
          variableValues: {
            name: term.name,
            startDate: term.startDate,
            endDate: term.endDate,
            academicYearId: academicYearId,
          },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        return response.data!.newTerm!.id as string;
      })
    );
    expect(termIds.every((termId) => typeof termId === "string")).toEqual(true);
  });

  it("should show academic year with fixed schedule and terms", async () => {
    const academicYearRepository = getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYear);
    const academicYear = (await academicYearRepository.findOne(academicYearId, {
      relations: ["schedule", "terms"],
    })) as AcademicYear;
    expect(academicYear).toHaveProperty("schedule");
    expect(academicYear).toHaveProperty("terms");
    expect(academicYear.schedule).not.toBeNull();
    expect(academicYear.terms).not.toBeNull();

    expect(academicYear.schedule.id).toEqual(scheduleId);
    academicYear.terms.forEach((term) => {
      expect(termIds.includes(term.id)).toEqual(true);
    });
  });

  it("should delete academic year along with fixed schedule and term", async () => {
    const response = await testClient({
      source: deleteAcademicYearMutation,
      variableValues: {
        id: academicYearId,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();

    const academicYearRepository = getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYear);
    const academicYear = await academicYearRepository.findOne(academicYearId);
    expect(academicYear).toBeUndefined();

    const scheduleRepository = getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYearSchedule);
    const schedule = await scheduleRepository.findOne(scheduleId);
    expect(schedule).toBeUndefined();

    const termRepository = getConnection(process.env.NODE_ENV).getRepository(
      Term
    );
    termIds.forEach(async (termId) => {
      const term = await termRepository.findOne(termId);
      expect(term).toBeUndefined();
    });
  });
});

/**
 * creating academic year with week rotation schedule
 */
describe("test case 2: create academic year with week rotation schedule", () => {
  let academicYearId: string;
  it("should create empty academic year", async () => {
    const response = await testClient({
      source: newAcademicYearMutation,
      variableValues: {
        startDate: "September 12 2021",
        endDate: "March 12 2022",
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    academicYearId = response.data!.newAcademicYear!.id;
  });

  let scheduleId: string;
  it("should create week rotation schedule", async () => {
    const response = await testClient({
      source: newScheduleMutation,
      variableValues: {
        type: "weekRotation",
        academicYearId: academicYearId,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    scheduleId = response.data!.newSchedule!.id;
  });

  let weekRotationScheduleId: string;
  it("should create partial week rotation schedule and assign it to week rotation schedule", async () => {
    const response = await testClient({
      source: newPartialWeekRotationMutation,
      variableValues: {
        numOfWeek: 2,
        startWeek: 1,
        scheduleId: scheduleId,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    weekRotationScheduleId = response.data!.newPartialWeekRotation!.id;
  });
  it("should show academic year with week rotation schedule", async () => {
    const academicYearRepository = getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYear);
    const academicYear = (await academicYearRepository.findOne(academicYearId, {
      relations: ["schedule", "schedule.dayRotation", "schedule.weekRotation"],
    })) as AcademicYear;
    expect(academicYear).toHaveProperty("schedule");
    expect(academicYear.schedule).not.toBeNull();
    expect(academicYear.schedule.weekRotation).not.toBeNull();

    expect(academicYear.schedule.id).toEqual(scheduleId);
    expect(academicYear.schedule.weekRotation.id).toEqual(
      weekRotationScheduleId
    );
  });

  it("should delete academic year along with week rotation schedule", async () => {
    const response = await testClient({
      source: deleteAcademicYearMutation,
      variableValues: {
        id: academicYearId,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();

    const academicYearRepository = getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYear);
    const academicYear = await academicYearRepository.findOne(academicYearId);
    expect(academicYear).toBeUndefined();

    const scheduleRepository = getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYearSchedule);
    const schedule = await scheduleRepository.findOne(scheduleId);
    expect(schedule).toBeUndefined();

    const weekRotationScheduleRepository = getConnection(
      process.env.NODE_ENV
    ).getRepository(WeekRotationSchedule);
    const weekRotationSchedule = await weekRotationScheduleRepository.findOne(
      weekRotationScheduleId
    );
    expect(weekRotationSchedule).toBeUndefined();
  });
});

/**
 * creating academic year with day rotation schedule
 */
describe("test case 3: create academic year with day rotation schedule", () => {
  let academicYearId: string;
  it("should create empty academic year", async () => {
    const response = await testClient({
      source: newAcademicYearMutation,
      variableValues: {
        startDate: "September 12 2021",
        endDate: "March 12 2022",
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    academicYearId = response.data!.newAcademicYear!.id;
  });

  let scheduleId: string;
  it("should create day rotation schedule", async () => {
    const response = await testClient({
      source: newScheduleMutation,
      variableValues: {
        type: "dayRotation",
        academicYearId: academicYearId,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    scheduleId = response.data!.newSchedule!.id;
  });

  let dayRotationScheduleId: string;
  it("should create partial day rotation schedule and assign it to day rotation schedule", async () => {
    const response = await testClient({
      source: newPartialDayRotationMutation,
      variableValues: {
        startDay: 2,
        numOfDay: 1,
        repeatDays: [1, 2, 3, 4],
        scheduleId: scheduleId,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    dayRotationScheduleId = response.data!.newPartialDayRotation!.id;
  });
  it("should show academic year with week rotation schedule", async () => {
    const academicYearRepository = getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYear);
    const academicYear = (await academicYearRepository.findOne(academicYearId, {
      relations: ["schedule", "schedule.dayRotation", "schedule.weekRotation"],
    })) as AcademicYear;
    expect(academicYear).toHaveProperty("schedule");
    expect(academicYear.schedule).not.toBeNull();
    expect(academicYear.schedule.dayRotation).not.toBeNull();

    expect(academicYear.schedule.id).toEqual(scheduleId);
    expect(academicYear.schedule.dayRotation.id).toEqual(dayRotationScheduleId);
  });
});

/**
 * fetctching academic year for user
 */
describe("test case 4: fetching academic years", () => {
  it("should fetch all academic years", async () => {
    const response = await testClient({
      source: getAcademicYearsQuery,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
  });
});
