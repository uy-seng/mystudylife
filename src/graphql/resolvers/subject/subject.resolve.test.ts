import { AcademicYear, Subject } from "src/entity";
import {
  loginMutation,
  newAcademicYearMutation,
  newScheduleMutation,
  newSubjectMutation,
  newTermMutation,
  registerMutation,
} from "src/graphql/mutation";
import { meQuery } from "src/graphql/query";
import { getConnection } from "typeorm";
import { testClient } from "../../../../test/graphqlTestClient";

/**
 * logging in user
 */
let accessToken: string;
describe("setting up user account", () => {
  it("should create new account for user", async () => {
    const response = await testClient({
      source: registerMutation,
      variableValues: {
        email: "sengouy0@gmail.com",
        username: "seng uy",
        password: "123",
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
  });
  it("should login user", async () => {
    const response = await testClient({
      source: loginMutation,
      variableValues: {
        email: "sengouy0@gmail.com",
        password: "123",
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

let academicYearId: string;
describe("create academic year with fixed schedule and term", () => {
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
});

describe("test case 1: create subject with no academic year", () => {
  let subjectId: string;
  it("should create subject with no academic year", async () => {
    const response = await testClient({
      source: newSubjectMutation,
      variableValues: {
        name: "Subject 1",
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
    subjectId = response.data!.newSubject.id;
  });
  it("should display subject with no academic year", async () => {
    const subjectRepository = getConnection(process.env.NODE_ENV).getRepository(
      Subject
    );
    const subject = await subjectRepository.findOne(subjectId, {
      relations: ["academicYear"],
    });
    expect(subject?.academicYear).toBeNull();
  });
});

describe("test case 2: create subject with academic year", () => {
  let subjectId: string;
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
