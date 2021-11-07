import { loginMutation, newAcademicYearMutation, newScheduleMutation, newSubjectMutation, registerMutation, } from "../../../graphql/mutation";
import { meQuery } from "../../../graphql/query";
import { testClient } from "../../../../test/graphqlTestClient";
import faker from "faker";
import { getConnection } from "typeorm";
import { AcademicYear, Subject, Task } from "../../../entity";
import { deleteTaskMutation, newTaskMutation, updateTaskMutation, } from "../../../graphql/mutation/task";
import { getTasksByDateQuery, getTasksQuery, } from "../../../graphql/query/task";
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
describe("test case 1: create task with no academic year", () => {
    it("should create task with no academic year", async () => {
        const response = await testClient({
            source: newTaskMutation,
            variableValues: {
                subjectId: subjectId,
                type: "assignment",
                due_date: "November 04 2021",
                title: "Task 1",
                detail: "testing",
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        const newTask = await getConnection(process.env.NODE_ENV)
            .getRepository(Task)
            .findOne(response.data.newTask.id, {
            relations: ["subject", "academicYear"],
        });
        expect(newTask).toHaveProperty("subject");
        expect(newTask).toHaveProperty("academicYear");
        expect(newTask.subject).not.toBeNull();
        expect(newTask.academicYear).toBeNull();
    });
});
describe("test case 2: create task with no academic year", () => {
    it("should create task with academic year", async () => {
        const response = await testClient({
            source: newTaskMutation,
            variableValues: {
                subjectId: subjectId,
                academicYearId: academicYearId,
                type: "review",
                due_date: "November 05 2021",
                title: "Task 2",
                detail: "testing",
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        const newTask = await getConnection(process.env.NODE_ENV)
            .getRepository(Task)
            .findOne(response.data.newTask.id, {
            relations: ["subject", "academicYear"],
        });
        expect(newTask).toHaveProperty("subject");
        expect(newTask).toHaveProperty("academicYear");
        expect(newTask.subject).not.toBeNull();
        expect(newTask.academicYear).not.toBeNull();
    });
});
describe("test case 3: query all tasks", () => {
    it("should query all tasks", async () => {
        const response = await testClient({
            source: getTasksQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getTasks).toHaveLength(2);
    });
});
describe("test case 4: query task by date", () => {
    it("should query task by date", async () => {
        const response = await testClient({
            source: getTasksByDateQuery,
            variableValues: {
                date: new Date("2021-11-04").toISOString().split("T")[0],
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getTasksByDate).toHaveLength(1);
    });
});
describe("test case 5: delete task", () => {
    let taskId;
    it("should query all tasks", async () => {
        const response = await testClient({
            source: getTasksQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getTasks).toHaveLength(2);
        taskId = response.data.getTasks[0].id;
        expect(taskId).toBeDefined();
    });
    it("should delete task", async () => {
        const response = await testClient({
            source: deleteTaskMutation,
            variableValues: {
                id: taskId,
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.deleteTask).toBeTruthy();
        const task = await getConnection(process.env.NODE_ENV)
            .getRepository(Task)
            .findOne(taskId);
        expect(task).toBeUndefined();
    });
});
describe("test case 6: update task", () => {
    let taskId;
    it("should query all tasks", async () => {
        const response = await testClient({
            source: getTasksQuery,
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.getTasks).toHaveLength(1);
        taskId = response.data.getTasks[0].id;
    });
    it("should update task", async () => {
        const response = await testClient({
            source: updateTaskMutation,
            variableValues: {
                id: taskId,
                title: "Task 1",
                detail: "testing",
                subjectId: subjectId,
                academicYearId: academicYearId,
                type: "assignment",
                due_date: "November 04 2021",
            },
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data).not.toBeNull();
        expect(response.data.updateTask).toBeTruthy();
        const task = await getConnection(process.env.NODE_ENV)
            .getRepository(Task)
            .findOne(taskId);
        expect(task).not.toBeNull();
        expect(task.title).toBe("Task 1");
        expect(task.detail).toBe("testing");
        expect(task.subject).not.toBeNull();
        expect(task.academicYear).not.toBeNull();
    });
});
//# sourceMappingURL=task.test.js.map