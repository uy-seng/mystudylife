"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mutation_1 = require("../../mutation");
const query_1 = require("../../query");
const graphqlTestClient_1 = require("../../../../test/graphqlTestClient");
const faker_1 = __importDefault(require("faker"));
const typeorm_1 = require("typeorm");
const entity_1 = require("../../../entity");
const class_1 = require("../../query/class");
const class_2 = require("../../mutation/class");
const oneOffSchedule_1 = require("../../mutation/oneOffSchedule");
const repeatSchedule_1 = require("../../mutation/repeatSchedule");
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
let subjectId;
describe("create subject with academic year", () => {
    it("should create subject with academic year: subject 1", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newSubjectMutation,
            variableValues: {
                name: "Subject 1",
                academicYearId: academicYearId,
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
    });
    it("should create subject with academic year: subject 2", async () => {
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
describe("test case 1: create class with one-off schedule with academic year", () => {
    let classId;
    it("should create class", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newClassMutation,
            variableValues: {
                subjectId: subjectId,
                academicYearId: academicYearId,
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        classId = response.data.newClass.id;
        expect(classId).toBeDefined();
    });
    let scheduleId;
    it("should create class schedule", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newClassScheduleMutation,
            variableValues: {
                classId: classId,
                type: "oneOff",
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        scheduleId = response.data.newClassSchedule.id;
        expect(scheduleId).toBeDefined();
    });
    it("should create one off schedule", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newOneOffScheduleMutation,
            variableValues: {
                scheduleId: scheduleId,
                date: "September 26 2021",
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
    it("should return class with correct data", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: class_1.getClassByIdQuery,
            variableValues: {
                id: classId,
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getClassById.academicYear.id).toEqual(academicYearId);
    });
});
describe("test case 2: create class with repeat schedule", () => {
    let classId;
    it("should create class", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newClassMutation,
            variableValues: {
                subjectId: subjectId,
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        classId = response.data.newClass.id;
        expect(classId).toBeDefined();
    });
    let scheduleId;
    it("should create class schedule", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newClassScheduleMutation,
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
        scheduleId = response.data.newClassSchedule.id;
        expect(scheduleId).toBeDefined();
    });
    it("should create repeat schedule", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newRepeatScheduleMutation,
            variableValues: {
                scheduleId: scheduleId,
                startTime: "8:00 AM",
                endTime: "9:50 AM",
                repeatDays: ["sunday"],
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
    });
});
describe("test case 3: query class base on date", () => {
    it("should return no class", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: query_1.getClassesByDateQuery,
            variableValues: {
                date: new Date("2100-12-02").toISOString().split("T")[0],
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getClassesByDate.length).toEqual(0);
    });
    it("should return class based on date", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: query_1.getClassesByDateQuery,
            variableValues: {
                date: new Date("2021-09-26").toISOString().split("T")[0],
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getClassesByDate.length).toEqual(2);
    });
    it("should return class within academic years", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: query_1.getClassesByDateQuery,
            variableValues: {
                date: new Date("2021-09-19").toISOString().split("T")[0],
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getClassesByDate.length).toEqual(1);
    });
    it("should return no class", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: query_1.getClassesByDateQuery,
            variableValues: {
                date: new Date("2021-03-13").toISOString().split("T")[0],
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getClassesByDate.length).toEqual(0);
    });
});
describe("test case 4: query all class", () => {
    it("should return all class", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: class_1.getClassesQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getClasses.length).toEqual(2);
        expect(response.data.getClasses[0]).toHaveProperty("subject");
        expect(response.data.getClasses[0]).toHaveProperty("academicYear");
    });
});
describe("test case 5: update class with one off schedule", () => {
    let c;
    it("should get one random class id from all classes", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: class_1.getClassesQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getClasses.length).toEqual(2);
        expect(response.data.getClasses[0]).toHaveProperty("subject");
        expect(response.data.getClasses[0]).toHaveProperty("academicYear");
        c = response.data.getClasses.filter((c) => c.schedule.type === "oneOff")[0];
        expect(c).toBeDefined();
    });
    it("should update subject of class", async () => {
        const subjects = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
            .getRepository(entity_1.Subject)
            .find();
        const newSubjectId = subjects[0].id;
        const response = await (0, graphqlTestClient_1.testClient)({
            source: class_2.updateClassMutation,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            variableValues: {
                id: c.id,
                subjectId: newSubjectId,
                academicYearId: c.academicYear.id,
                module: c.module,
                room: c.room,
                building: c.building,
                teacher: c.teacher,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        const updatedClass = (await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
            .getRepository(entity_1.Class)
            .findOne(c.id, {
            relations: ["subject"],
        }));
        expect(updatedClass.subject.id).toEqual(newSubjectId);
    });
    it("should update one off schedule of class", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: oneOffSchedule_1.updateOneOffScheduleMutation,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            variableValues: {
                id: c.schedule.oneOff.id,
                scheduleId: c.schedule.id,
                date: "2021-10-30",
                startTime: "01:00:00",
                endTime: "02:50:00",
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        const updatedClass = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
            .getRepository(entity_1.Class)
            .findOne(c.id, { relations: ["schedule", "schedule.oneOff"] });
        expect(updatedClass).toBeDefined();
        expect(updatedClass?.schedule.oneOff.date).toEqual("2021-10-30");
        expect(updatedClass?.schedule.oneOff.startTime).toEqual("01:00:00");
        expect(updatedClass?.schedule.oneOff.endTime).toEqual("02:50:00");
    });
});
describe("test case 6: deleting class with one off schedule", () => {
    let classId;
    let classScheduleId;
    let oneOffScheduleId;
    it("should get one random class id from all classes", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: class_1.getClassesQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getClasses.length).toEqual(2);
        expect(response.data.getClasses[0]).toHaveProperty("subject");
        expect(response.data.getClasses[0]).toHaveProperty("academicYear");
        classId = response.data.getClasses[0].id;
        classScheduleId = response.data.getClasses[0].schedule.id;
        oneOffScheduleId = response.data.getClasses[0].schedule.oneOff.id;
        expect(classId).toBeDefined();
        expect(classScheduleId).toBeDefined();
        expect(oneOffScheduleId).toBeDefined();
    });
    it(`should delete class with id specified`, async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.deleteClassMutation,
            variableValues: {
                id: classId,
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
    });
    it("should delete schedule of class with id specified", async () => {
        const classScheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.ClassSchedule);
        const q = await classScheduleRepository.findOne(classScheduleId);
        expect(q).toBeUndefined();
    });
    it("should delete one-off schedule of class with id specified", async () => {
        const oneOffScheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.OneOffSchedule);
        const q = await oneOffScheduleRepository.findOne(oneOffScheduleId);
        expect(q).toBeUndefined();
    });
});
describe("test case 7: updating class with repeat schedule", () => {
    let c;
    it("should get one random class id from all classes", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: class_1.getClassesQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        c = response.data.getClasses[0];
        expect(response.data.getClasses.length).toEqual(1);
        expect(response.data.getClasses[0]).toHaveProperty("subject");
        expect(response.data.getClasses[0]).toHaveProperty("academicYear");
        expect(c).toBeDefined();
    });
    it("should update subject of class", async () => {
        const subjects = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
            .getRepository(entity_1.Subject)
            .find();
        const newSubjectId = subjects[0].id;
        const response = await (0, graphqlTestClient_1.testClient)({
            source: class_2.updateClassMutation,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            variableValues: {
                id: c.id,
                subjectId: newSubjectId,
                academicYearId: c?.academicYear?.id,
                module: c.module,
                room: c.room,
                building: c.building,
                teacher: c.teacher,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        const updatedClass = (await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
            .getRepository(entity_1.Class)
            .findOne(c.id, {
            relations: ["subject"],
        }));
        expect(updatedClass.subject.id).toEqual(newSubjectId);
    });
    it("should update repeat schedule of class", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: repeatSchedule_1.updateRepeatScheduleMutation,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            variableValues: {
                id: c.schedule.repeat[0].id,
                scheduleId: c.schedule.id,
                startTime: "01:00:00",
                endTime: "02:50:00",
                repeatDays: ["monday", "tuesday"],
                startDate: null,
                endDate: null,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        const updatedClass = await (0, typeorm_1.getConnection)(process.env.NODE_ENV)
            .getRepository(entity_1.Class)
            .findOne(c.id, { relations: ["schedule", "schedule.repeat"] });
        expect(updatedClass).toBeDefined();
        expect(updatedClass?.schedule.repeat[0].startTime).toEqual("01:00:00");
        expect(updatedClass?.schedule.repeat[0].endTime).toEqual("02:50:00");
        expect(updatedClass?.schedule.repeat[0].repeatDays).toContain(1);
        expect(updatedClass?.schedule.repeat[0].repeatDays).toContain(2);
        expect(updatedClass?.schedule.repeat[0].startDate).toEqual(null);
        expect(updatedClass?.schedule.repeat[0].endDate).toEqual(null);
    });
});
describe("test case 8: deleting class with repeat schedule", () => {
    let classId;
    let classScheduleId;
    let repeatScheduleId;
    it("should get one random class id from all classes", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: class_1.getClassesQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getClasses.length).toEqual(1);
        expect(response.data.getClasses[0]).toHaveProperty("subject");
        expect(response.data.getClasses[0]).toHaveProperty("academicYear");
        classId = response.data.getClasses[0].id;
        classScheduleId = response.data.getClasses[0].schedule.id;
        repeatScheduleId = response.data.getClasses[0].schedule.repeat[0].id;
        expect(classId).toBeDefined();
        expect(classScheduleId).toBeDefined();
        expect(repeatScheduleId).toBeDefined();
    });
    it(`should delete class with id specified`, async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.deleteClassMutation,
            variableValues: {
                id: classId,
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
    });
    it("should delete schedule of class with id specified", async () => {
        const classScheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.ClassSchedule);
        const q = await classScheduleRepository.findOne(classScheduleId);
        expect(q).toBeUndefined();
    });
    it("should delete repeat schedule of class with id specified", async () => {
        const repeatScheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.RepeatSchedule);
        const q = await repeatScheduleRepository.findOne(repeatScheduleId);
        expect(q).toBeUndefined();
    });
});
describe("test case 9: create class with repeat schedule", () => {
    let classId;
    it("should create class", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newClassMutation,
            variableValues: {
                subjectId: subjectId,
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        classId = response.data.newClass.id;
        expect(classId).toBeDefined();
    });
    let scheduleId;
    it("should create class schedule", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newClassScheduleMutation,
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
        scheduleId = response.data.newClassSchedule.id;
        expect(scheduleId).toBeDefined();
    });
    it("should create repeat schedule (1)", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newRepeatScheduleMutation,
            variableValues: {
                scheduleId: scheduleId,
                startTime: "8:00 AM",
                endTime: "9:50 AM",
                repeatDays: ["sunday"],
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
    });
    it("should create repeat schedule (2)", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: mutation_1.newRepeatScheduleMutation,
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
    it("should return new class with 2 repeat schedules", async () => {
        const response = await (0, graphqlTestClient_1.testClient)({
            source: class_1.getClassesQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getClasses.length).toEqual(1);
        expect(response.data.getClasses[0].schedule.repeat.length).toEqual(2);
    });
});
//# sourceMappingURL=class.resolver.test.js.map