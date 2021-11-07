"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("src/entity");
const mutation_1 = require("src/graphql/mutation");
const academicYear_1 = require("src/graphql/mutation/academicYear");
const query_1 = require("src/graphql/query");
const typeorm_1 = require("typeorm");
const graphqlTestClient_1 = require("../../../../test/graphqlTestClient");
const faker_1 = __importDefault(require("faker"));
const testUser = {
    email: faker_1.default.internet.email(),
    username: faker_1.default.internet.userName(),
    password: faker_1.default.internet.password(),
};
let accessToken;
describe("setting up user account", () => {
    it("should create new account for user", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.registerMutation,
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
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.loginMutation,
            variableValues: {
                email: testUser.email,
                password: testUser.password,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        accessToken = response.data.login.accessToken;
    });
    it("should show authenticated user", async () => {
        expect(accessToken).toBeDefined();
        const response = await (0, graphqlTestClient_1.testClient)({
            source: query_1.meQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
    });
});
describe("test case 1: create academic year with fixed schedule and term", () => {
    let academicYearId;
    it("should create empty academic year", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newAcademicYearMutation,
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
        academicYearId = response.data.newAcademicYear.id;
    });
    let scheduleId;
    it("should create fixed schedule", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newScheduleMutation,
            variableValues: {
                type: "fixed",
                academicYearId: academicYearId,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        scheduleId = response.data.newSchedule.id;
    });
    let termIds;
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
        termIds = await Promise.all(terms.map(async (term) => {
            const response = await (0, graphqlTestClient_1.testClient)({
                source: mutation_1.newTermMutation,
                variableValues: {
                    name: term.name,
                    startDate: term.startDate,
                    endDate: term.endDate,
                    academicYearId: academicYearId,
                },
            });
            expect(response.errors).toBeUndefined();
            expect(response.data).not.toBeNull();
            return response.data.newTerm.id;
        }));
        expect(termIds.every((termId) => typeof termId === "string")).toEqual(true);
    });
    it("should show academic year with fixed schedule and terms", async () => {
        const academicYearRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYear);
        const academicYear = (await academicYearRepository.findOne(academicYearId, {
            relations: ["schedule", "terms"],
        }));
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
        const response = await (0, graphqlTestClient_1.testClient)({
            source: academicYear_1.deleteAcademicYearMutation,
            variableValues: {
                id: academicYearId,
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        const academicYearRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYear);
        const academicYear = await academicYearRepository.findOne(academicYearId);
        expect(academicYear).toBeUndefined();
        const scheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYearSchedule);
        const schedule = await scheduleRepository.findOne(scheduleId);
        expect(schedule).toBeUndefined();
        const termRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.Term);
        termIds.forEach(async (termId) => {
            const term = await termRepository.findOne(termId);
            expect(term).toBeUndefined();
        });
    });
});
describe("test case 2: create academic year with week rotation schedule", () => {
    let academicYearId;
    it("should create empty academic year", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newAcademicYearMutation,
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
        academicYearId = response.data.newAcademicYear.id;
    });
    let scheduleId;
    it("should create week rotation schedule", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newScheduleMutation,
            variableValues: {
                type: "weekRotation",
                academicYearId: academicYearId,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        scheduleId = response.data.newSchedule.id;
    });
    let weekRotationScheduleId;
    it("should create partial week rotation schedule and assign it to week rotation schedule", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newPartialWeekRotationMutation,
            variableValues: {
                numOfWeek: 2,
                startWeek: 1,
                scheduleId: scheduleId,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        weekRotationScheduleId = response.data.newPartialWeekRotation.id;
    });
    it("should show academic year with week rotation schedule", async () => {
        const academicYearRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYear);
        const academicYear = (await academicYearRepository.findOne(academicYearId, {
            relations: ["schedule", "schedule.dayRotation", "schedule.weekRotation"],
        }));
        expect(academicYear).toHaveProperty("schedule");
        expect(academicYear.schedule).not.toBeNull();
        expect(academicYear.schedule.weekRotation).not.toBeNull();
        expect(academicYear.schedule.id).toEqual(scheduleId);
        expect(academicYear.schedule.weekRotation.id).toEqual(weekRotationScheduleId);
    });
    it("should delete academic year along with week rotation schedule", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: academicYear_1.deleteAcademicYearMutation,
            variableValues: {
                id: academicYearId,
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        const academicYearRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYear);
        const academicYear = await academicYearRepository.findOne(academicYearId);
        expect(academicYear).toBeUndefined();
        const scheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYearSchedule);
        const schedule = await scheduleRepository.findOne(scheduleId);
        expect(schedule).toBeUndefined();
        const weekRotationScheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.WeekRotationSchedule);
        const weekRotationSchedule = await weekRotationScheduleRepository.findOne(weekRotationScheduleId);
        expect(weekRotationSchedule).toBeUndefined();
    });
});
describe("test case 3: create academic year with day rotation schedule", () => {
    let academicYearId;
    it("should create empty academic year", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newAcademicYearMutation,
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
        academicYearId = response.data.newAcademicYear.id;
    });
    let scheduleId;
    it("should create day rotation schedule", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newScheduleMutation,
            variableValues: {
                type: "dayRotation",
                academicYearId: academicYearId,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        scheduleId = response.data.newSchedule.id;
    });
    let dayRotationScheduleId;
    it("should create partial day rotation schedule and assign it to day rotation schedule", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newPartialDayRotationMutation,
            variableValues: {
                startDay: 2,
                numOfDay: 1,
                repeatDays: [1, 2, 3, 4],
                scheduleId: scheduleId,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        dayRotationScheduleId = response.data.newPartialDayRotation.id;
    });
    it("should show academic year with week rotation schedule", async () => {
        const academicYearRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYear);
        const academicYear = (await academicYearRepository.findOne(academicYearId, {
            relations: ["schedule", "schedule.dayRotation", "schedule.weekRotation"],
        }));
        expect(academicYear).toHaveProperty("schedule");
        expect(academicYear.schedule).not.toBeNull();
        expect(academicYear.schedule.dayRotation).not.toBeNull();
        expect(academicYear.schedule.id).toEqual(scheduleId);
        expect(academicYear.schedule.dayRotation.id).toEqual(dayRotationScheduleId);
    });
});
describe("test case 4: fetching academic years", () => {
    it("should fetch all academic years", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: query_1.getAcademicYearsQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
    });
});
//# sourceMappingURL=academicYear.test.js.map