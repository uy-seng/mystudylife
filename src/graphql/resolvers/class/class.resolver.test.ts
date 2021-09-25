import {
  loginMutation,
  newAcademicYearMutation,
  newClassMutation,
  newClassScheduleMutation,
  newOneOffScheduleMutation,
  newRepeatScheduleMutation,
  newScheduleMutation,
  newSubjectMutation,
  registerMutation,
} from "src/graphql/mutation";
import { meQuery } from "src/graphql/query";
import { testClient } from "../../../../test/graphqlTestClient";
import faker from "faker";
import { getConnection } from "typeorm";
import { AcademicYear, Subject } from "src/entity";

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
 * creating academic year with fixed schedule and no term
 */
let academicYearId: string;
describe("create academic year with fixed schedule and no term", () => {
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

  it("should show academic year with fixed schedule", async () => {
    const academicYearRepository = getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYear);
    const academicYear = (await academicYearRepository.findOne(academicYearId, {
      relations: ["schedule"],
    })) as AcademicYear;
    expect(academicYear).toHaveProperty("schedule");
    expect(academicYear.schedule).not.toBeNull();
    expect(academicYear.schedule.id).toEqual(scheduleId);
  });
});

/**
 * create subject with academic year
 */
let subjectId: string;
describe("create subject with academic year", () => {
  it("should create subject with academic year", async () => {
    const response = await testClient({
      source: newSubjectMutation,
      variableValues: {
        name: "Subject 2",
        academicYearId: academicYearId,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    subjectId = response.data!.newSubject.id;
  });
  it("should display subject with academic year", async () => {
    const subjectRepository = getConnection(process.env.NODE_ENV).getRepository(
      Subject
    );
    const subject = await subjectRepository.findOne(subjectId, {
      relations: ["academicYear"],
    });
    expect(subject?.academicYear).not.toBeNull();
  });
});

/**
 * creating class with one-off schedule
 */
describe("test case 1: create class with one-off schedule", () => {
  let classId: string;
  it("should create class", async () => {
    const response = await testClient({
      source: newClassMutation,
      variableValues: {
        subjectId: subjectId,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    classId = response.data!.newClass.id;
    expect(classId).toBeDefined();
  });

  let scheduleId: string;
  it("should create class schedule", async () => {
    const response = await testClient({
      source: newClassScheduleMutation,
      variableValues: {
        classId: classId,
        type: "one_off",
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    scheduleId = response.data!.newClassSchedule.id;
    expect(scheduleId).toBeDefined();
  });

  it("should create one off schedule", async () => {
    const response = await testClient({
      source: newOneOffScheduleMutation,
      variableValues: {
        scheduleId: scheduleId,
        date: "September 25 2021",
        startTime: "8:00 AM",
        endTime: "9:50 AM",
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
  });
});

/**
 * creating class with repeat schedule
 */
describe("test case 2: create class with repeat schedule", () => {
  let classId: string;
  it("should create class", async () => {
    const response = await testClient({
      source: newClassMutation,
      variableValues: {
        subjectId: subjectId,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    classId = response.data!.newClass.id;
    expect(classId).toBeDefined();
  });

  let scheduleId: string;
  it("should create class schedule", async () => {
    const response = await testClient({
      source: newClassScheduleMutation,
      variableValues: {
        classId: classId,
        type: "repeat",
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    scheduleId = response.data!.newClassSchedule.id;
    expect(scheduleId).toBeDefined();
  });

  it("should create repeat schedule", async () => {
    const response = await testClient({
      source: newRepeatScheduleMutation,
      variableValues: {
        scheduleId: scheduleId,
        startTime: "8:00 AM",
        endTime: "9:50 AM",
        repeatDays: ["monday"],
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
  });
});
