"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../../../entity");
const mutation_1 = require("../../../graphql/mutation");
const query_1 = require("../../../graphql/query");
const typeorm_1 = require("typeorm");
const graphqlTestClient_1 = require("../../../../test/graphqlTestClient");
const faker_1 = __importDefault(require("faker"));
const subject_1 = require("../../../graphql/mutation/subject");
const helper_1 = require("../../../helper");
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
let academicYearId;
describe("create academic year with fixed schedule and no term", () => {
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
    it("should show academic year with fixed schedule", async () => {
        const academicYearRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYear);
        const academicYear = (await academicYearRepository.findOne(academicYearId, {
            relations: ["schedule"],
        }));
        expect(academicYear).toHaveProperty("schedule");
        expect(academicYear.schedule).not.toBeNull();
        expect(academicYear.schedule.id).toEqual(scheduleId);
    });
});
describe("test case 1: create subject with no academic year", () => {
    let subjectId;
    it("should create subject with no academic year", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newSubjectMutation,
            variableValues: {
                name: "Subject 1",
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        subjectId = response.data.newSubject.id;
    });
    it("should display subject with no academic year", async () => {
        const subjectRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.Subject);
        const subject = await subjectRepository.findOne(subjectId, {
            relations: ["academicYear"],
        });
        expect(subject?.academicYear).toBeNull();
    });
});
describe("test case 2: create subject with academic year", () => {
    let subjectId;
    it("should create subject with academic year", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newSubjectMutation,
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
        subjectId = response.data.newSubject.id;
    });
    it("should display subject with academic year", async () => {
        const subjectRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.Subject);
        const subject = await subjectRepository.findOne(subjectId, {
            relations: ["academicYear"],
        });
        expect(subject?.academicYear).not.toBeNull();
    });
});
describe("test case 3: should be able to fetch subjects", () => {
    it("should fetch all subjects", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: query_1.getSubjectsQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getSubjects.length).toEqual(2);
        expect(response.data.getSubjects[0]).toHaveProperty("academicYear");
    });
});
describe("test case 4: should be able to update subject", () => {
    let subjectId;
    it("should fetch 1 subject with name and no academic year", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: query_1.getSubjectsQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getSubjects.filter((s) => s.academicYear === null)
            .length).toEqual(1);
        subjectId = response.data.getSubjects.filter((s) => s.academicYear === null)[0];
        expect(subjectId).toBeDefined();
    });
    it("should update name of subject", async () => {
        const subject = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
            .getRepository(entity_1.Subject)
            .findOne(subjectId, { relations: ["academicYear"] });
        expect(subject).toBeDefined();
        const response = await (0, graphqlTestClient_1.testClient)({
            source: subject_1.updateSubjectMutation,
            variableValues: {
                id: subject?.id,
                academicYearId: subject?.academicYear?.id || null,
                name: "meow",
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        const updatedSubject = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
            .getRepository(entity_1.Subject)
            .findOne(subjectId, { relations: ["academicYear"] });
        expect(updatedSubject?.name).toEqual("meow");
    });
    it("should update academic year of subject", async () => {
        const subject = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
            .getRepository(entity_1.Subject)
            .findOne(subjectId, { relations: ["academicYear"] });
        const response = await (0, graphqlTestClient_1.testClient)({
            source: subject_1.updateSubjectMutation,
            variableValues: {
                id: subject?.id,
                academicYearId: academicYearId,
                name: subject?.name,
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        const updatedSubject = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
            .getRepository(entity_1.Subject)
            .findOne(subjectId, { relations: ["academicYear"] });
        expect(updatedSubject).toHaveProperty("academicYear");
        expect(updatedSubject?.academicYear.id).toEqual(academicYearId);
    });
});
describe("test case 5: deleting subject", () => {
    it("should delete all subjects", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: query_1.getSubjectsQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        await (0, helper_1.asyncForEach)(response.data.getSubjects, async (subject) => {
            await (0, graphqlTestClient_1.testClient)({
                source: subject_1.deleteSubjectMutation,
                variableValues: {
                    id: subject.id,
                },
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
        });
        const subjects = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
            .getRepository(entity_1.Subject)
            .find();
        expect(subjects.length).toEqual(0);
    });
});
//# sourceMappingURL=subject.resolve.test.js.map