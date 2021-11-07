import { deleteClassMutation, loginMutation, newAcademicYearMutation, newClassMutation, newClassScheduleMutation, newOneOffScheduleMutation, newRepeatScheduleMutation, newScheduleMutation, newSubjectMutation, registerMutation, } from "../../mutation";
import { getClassesByDateQuery, meQuery } from "../../query";
import { testClient } from "../../../../test/graphqlTestClient";
import faker from "faker";
import { getConnection } from "typeorm";
import { AcademicYear, Class, ClassSchedule, OneOffSchedule, RepeatSchedule, Subject, } from "../../../entity";
import { getClassByIdQuery, getClassesQuery } from "../../query/class";
import { updateClassMutation } from "../../mutation/class";
import { updateOneOffScheduleMutation } from "../../mutation/oneOffSchedule";
import { updateRepeatScheduleMutation } from "../../mutation/repeatSchedule";
const testUser = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
};
let accessToken;
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
        accessToken = response.data.login.accessToken;
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
let academicYearId;
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
        academicYearId = response.data.newAcademicYear.id;
    });
    let scheduleId;
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
        scheduleId = response.data.newSchedule.id;
    });
    it("should show academic year with fixed schedule", async () => {
        const academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
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
        const response = await testClient({
            source: newSubjectMutation,
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
        subjectId = response.data.newSubject.id;
    });
    it("should display subject with academic year", async () => {
        const subjectRepository = getConnection(process.env.NODE_ENV).getRepository(Subject);
        const subject = await subjectRepository.findOne(subjectId, {
            relations: ["academicYear"],
        });
        expect(subject === null || subject === void 0 ? void 0 : subject.academicYear).not.toBeNull();
    });
});
describe("test case 1: create class with one-off schedule with academic year", () => {
    let classId;
    it("should create class", async () => {
        const response = await testClient({
            source: newClassMutation,
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
        const response = await testClient({
            source: newClassScheduleMutation,
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
        const response = await testClient({
            source: newOneOffScheduleMutation,
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
        const response = await testClient({
            source: getClassByIdQuery,
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
        classId = response.data.newClass.id;
        expect(classId).toBeDefined();
    });
    let scheduleId;
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
        scheduleId = response.data.newClassSchedule.id;
        expect(scheduleId).toBeDefined();
    });
    it("should create repeat schedule", async () => {
        const response = await testClient({
            source: newRepeatScheduleMutation,
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
        const response = await testClient({
            source: getClassesByDateQuery,
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
        const response = await testClient({
            source: getClassesByDateQuery,
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
        const response = await testClient({
            source: getClassesByDateQuery,
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
        const response = await testClient({
            source: getClassesByDateQuery,
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
        const response = await testClient({
            source: getClassesQuery,
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
        const response = await testClient({
            source: getClassesQuery,
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
        const subjects = await getConnection(process.env.NODE_ENV)
            .getRepository(Subject)
            .find();
        const newSubjectId = subjects[0].id;
        const response = await testClient({
            source: updateClassMutation,
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
        const updatedClass = (await getConnection(process.env.NODE_ENV)
            .getRepository(Class)
            .findOne(c.id, {
            relations: ["subject"],
        }));
        expect(updatedClass.subject.id).toEqual(newSubjectId);
    });
    it("should update one off schedule of class", async () => {
        const response = await testClient({
            source: updateOneOffScheduleMutation,
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
        const updatedClass = await getConnection(process.env.NODE_ENV)
            .getRepository(Class)
            .findOne(c.id, { relations: ["schedule", "schedule.oneOff"] });
        expect(updatedClass).toBeDefined();
        expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.oneOff.date).toEqual("2021-10-30");
        expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.oneOff.startTime).toEqual("01:00:00");
        expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.oneOff.endTime).toEqual("02:50:00");
    });
});
describe("test case 6: deleting class with one off schedule", () => {
    let classId;
    let classScheduleId;
    let oneOffScheduleId;
    it("should get one random class id from all classes", async () => {
        const response = await testClient({
            source: getClassesQuery,
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
        const response = await testClient({
            source: deleteClassMutation,
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
        const classScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(ClassSchedule);
        const q = await classScheduleRepository.findOne(classScheduleId);
        expect(q).toBeUndefined();
    });
    it("should delete one-off schedule of class with id specified", async () => {
        const oneOffScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(OneOffSchedule);
        const q = await oneOffScheduleRepository.findOne(oneOffScheduleId);
        expect(q).toBeUndefined();
    });
});
describe("test case 7: updating class with repeat schedule", () => {
    let c;
    it("should get one random class id from all classes", async () => {
        const response = await testClient({
            source: getClassesQuery,
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
        var _a;
        const subjects = await getConnection(process.env.NODE_ENV)
            .getRepository(Subject)
            .find();
        const newSubjectId = subjects[0].id;
        const response = await testClient({
            source: updateClassMutation,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            variableValues: {
                id: c.id,
                subjectId: newSubjectId,
                academicYearId: (_a = c === null || c === void 0 ? void 0 : c.academicYear) === null || _a === void 0 ? void 0 : _a.id,
                module: c.module,
                room: c.room,
                building: c.building,
                teacher: c.teacher,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        const updatedClass = (await getConnection(process.env.NODE_ENV)
            .getRepository(Class)
            .findOne(c.id, {
            relations: ["subject"],
        }));
        expect(updatedClass.subject.id).toEqual(newSubjectId);
    });
    it("should update repeat schedule of class", async () => {
        const response = await testClient({
            source: updateRepeatScheduleMutation,
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
        const updatedClass = await getConnection(process.env.NODE_ENV)
            .getRepository(Class)
            .findOne(c.id, { relations: ["schedule", "schedule.repeat"] });
        expect(updatedClass).toBeDefined();
        expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].startTime).toEqual("01:00:00");
        expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].endTime).toEqual("02:50:00");
        expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].repeatDays).toContain(1);
        expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].repeatDays).toContain(2);
        expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].startDate).toEqual(null);
        expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].endDate).toEqual(null);
    });
});
describe("test case 8: deleting class with repeat schedule", () => {
    let classId;
    let classScheduleId;
    let repeatScheduleId;
    it("should get one random class id from all classes", async () => {
        const response = await testClient({
            source: getClassesQuery,
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
        const response = await testClient({
            source: deleteClassMutation,
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
        const classScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(ClassSchedule);
        const q = await classScheduleRepository.findOne(classScheduleId);
        expect(q).toBeUndefined();
    });
    it("should delete repeat schedule of class with id specified", async () => {
        const repeatScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(RepeatSchedule);
        const q = await repeatScheduleRepository.findOne(repeatScheduleId);
        expect(q).toBeUndefined();
    });
});
describe("test case 9: create class with repeat schedule", () => {
    let classId;
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
        classId = response.data.newClass.id;
        expect(classId).toBeDefined();
    });
    let scheduleId;
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
        scheduleId = response.data.newClassSchedule.id;
        expect(scheduleId).toBeDefined();
    });
    it("should create repeat schedule (1)", async () => {
        const response = await testClient({
            source: newRepeatScheduleMutation,
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
    it("should return new class with 2 repeat schedules", async () => {
        const response = await testClient({
            source: getClassesQuery,
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