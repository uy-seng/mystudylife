var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var testUser = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
};
var accessToken;
describe("setting up user account", function () {
    it("should create new account for user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: registerMutation,
                        variableValues: {
                            email: testUser.email,
                            username: testUser.username,
                            password: testUser.password,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [2];
            }
        });
    }); });
    it("should login user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: loginMutation,
                        variableValues: {
                            email: testUser.email,
                            password: testUser.password,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    accessToken = response.data.login.accessToken;
                    return [2];
            }
        });
    }); });
    it("should show authenticated user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect(accessToken).toBeDefined();
                    return [4, testClient({
                            source: meQuery,
                            headers: {
                                authorization: "Bearer " + accessToken,
                            },
                        })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [2];
            }
        });
    }); });
});
var academicYearId;
describe("create academic year with fixed schedule and no term", function () {
    it("should create empty academic year", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newAcademicYearMutation,
                        variableValues: {
                            startDate: "September 12 2021",
                            endDate: "March 12 2022",
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    academicYearId = response.data.newAcademicYear.id;
                    return [2];
            }
        });
    }); });
    var scheduleId;
    it("should create fixed schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newScheduleMutation,
                        variableValues: {
                            type: "fixed",
                            academicYearId: academicYearId,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    scheduleId = response.data.newSchedule.id;
                    return [2];
            }
        });
    }); });
    it("should show academic year with fixed schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var academicYearRepository, academicYear;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
                    return [4, academicYearRepository.findOne(academicYearId, {
                            relations: ["schedule"],
                        })];
                case 1:
                    academicYear = (_a.sent());
                    expect(academicYear).toHaveProperty("schedule");
                    expect(academicYear.schedule).not.toBeNull();
                    expect(academicYear.schedule.id).toEqual(scheduleId);
                    return [2];
            }
        });
    }); });
});
var subjectId;
describe("create subject with academic year", function () {
    it("should create subject with academic year: subject 1", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newSubjectMutation,
                        variableValues: {
                            name: "Subject 1",
                            academicYearId: academicYearId,
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [2];
            }
        });
    }); });
    it("should create subject with academic year: subject 2", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newSubjectMutation,
                        variableValues: {
                            name: "Subject 2",
                            academicYearId: academicYearId,
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    subjectId = response.data.newSubject.id;
                    return [2];
            }
        });
    }); });
    it("should display subject with academic year", function () { return __awaiter(void 0, void 0, void 0, function () {
        var subjectRepository, subject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subjectRepository = getConnection(process.env.NODE_ENV).getRepository(Subject);
                    return [4, subjectRepository.findOne(subjectId, {
                            relations: ["academicYear"],
                        })];
                case 1:
                    subject = _a.sent();
                    expect(subject === null || subject === void 0 ? void 0 : subject.academicYear).not.toBeNull();
                    return [2];
            }
        });
    }); });
});
describe("test case 1: create class with one-off schedule with academic year", function () {
    var classId;
    it("should create class", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newClassMutation,
                        variableValues: {
                            subjectId: subjectId,
                            academicYearId: academicYearId,
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    classId = response.data.newClass.id;
                    expect(classId).toBeDefined();
                    return [2];
            }
        });
    }); });
    var scheduleId;
    it("should create class schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newClassScheduleMutation,
                        variableValues: {
                            classId: classId,
                            type: "oneOff",
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    scheduleId = response.data.newClassSchedule.id;
                    expect(scheduleId).toBeDefined();
                    return [2];
            }
        });
    }); });
    it("should create one off schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newOneOffScheduleMutation,
                        variableValues: {
                            scheduleId: scheduleId,
                            date: "September 26 2021",
                            startTime: "8:00 AM",
                            endTime: "9:50 AM",
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [2];
            }
        });
    }); });
    it("should return class with correct data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getClassByIdQuery,
                        variableValues: {
                            id: classId,
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    expect(response.data.getClassById.academicYear.id).toEqual(academicYearId);
                    return [2];
            }
        });
    }); });
});
describe("test case 2: create class with repeat schedule", function () {
    var classId;
    it("should create class", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newClassMutation,
                        variableValues: {
                            subjectId: subjectId,
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    classId = response.data.newClass.id;
                    expect(classId).toBeDefined();
                    return [2];
            }
        });
    }); });
    var scheduleId;
    it("should create class schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newClassScheduleMutation,
                        variableValues: {
                            classId: classId,
                            type: "repeat",
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    scheduleId = response.data.newClassSchedule.id;
                    expect(scheduleId).toBeDefined();
                    return [2];
            }
        });
    }); });
    it("should create repeat schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newRepeatScheduleMutation,
                        variableValues: {
                            scheduleId: scheduleId,
                            startTime: "8:00 AM",
                            endTime: "9:50 AM",
                            repeatDays: ["sunday"],
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [2];
            }
        });
    }); });
});
describe("test case 3: query class base on date", function () {
    it("should return no class", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getClassesByDateQuery,
                        variableValues: {
                            date: new Date("2100-12-02").toISOString().split("T")[0],
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    expect(response.data.getClassesByDate.length).toEqual(0);
                    return [2];
            }
        });
    }); });
    it("should return class based on date", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getClassesByDateQuery,
                        variableValues: {
                            date: new Date("2021-09-26").toISOString().split("T")[0],
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    expect(response.data.getClassesByDate.length).toEqual(2);
                    return [2];
            }
        });
    }); });
    it("should return class within academic years", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getClassesByDateQuery,
                        variableValues: {
                            date: new Date("2021-09-19").toISOString().split("T")[0],
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    expect(response.data.getClassesByDate.length).toEqual(1);
                    return [2];
            }
        });
    }); });
    it("should return no class", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getClassesByDateQuery,
                        variableValues: {
                            date: new Date("2021-03-13").toISOString().split("T")[0],
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    expect(response.data.getClassesByDate.length).toEqual(0);
                    return [2];
            }
        });
    }); });
});
describe("test case 4: query all class", function () {
    it("should return all class", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getClassesQuery,
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    expect(response.data.getClasses.length).toEqual(2);
                    expect(response.data.getClasses[0]).toHaveProperty("subject");
                    expect(response.data.getClasses[0]).toHaveProperty("academicYear");
                    return [2];
            }
        });
    }); });
});
describe("test case 5: update class with one off schedule", function () {
    var c;
    it("should get one random class id from all classes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getClassesQuery,
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    expect(response.data.getClasses.length).toEqual(2);
                    expect(response.data.getClasses[0]).toHaveProperty("subject");
                    expect(response.data.getClasses[0]).toHaveProperty("academicYear");
                    c = response.data.getClasses.filter(function (c) { return c.schedule.type === "oneOff"; })[0];
                    expect(c).toBeDefined();
                    return [2];
            }
        });
    }); });
    it("should update subject of class", function () { return __awaiter(void 0, void 0, void 0, function () {
        var subjects, newSubjectId, response, updatedClass;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, getConnection(process.env.NODE_ENV)
                        .getRepository(Subject)
                        .find()];
                case 1:
                    subjects = _a.sent();
                    newSubjectId = subjects[0].id;
                    return [4, testClient({
                            source: updateClassMutation,
                            headers: {
                                authorization: "Bearer " + accessToken,
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
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [4, getConnection(process.env.NODE_ENV)
                            .getRepository(Class)
                            .findOne(c.id, {
                            relations: ["subject"],
                        })];
                case 3:
                    updatedClass = (_a.sent());
                    expect(updatedClass.subject.id).toEqual(newSubjectId);
                    return [2];
            }
        });
    }); });
    it("should update one off schedule of class", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, updatedClass;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: updateOneOffScheduleMutation,
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                        variableValues: {
                            id: c.schedule.oneOff.id,
                            scheduleId: c.schedule.id,
                            date: "2021-10-30",
                            startTime: "01:00:00",
                            endTime: "02:50:00",
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [4, getConnection(process.env.NODE_ENV)
                            .getRepository(Class)
                            .findOne(c.id, { relations: ["schedule", "schedule.oneOff"] })];
                case 2:
                    updatedClass = _a.sent();
                    expect(updatedClass).toBeDefined();
                    expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.oneOff.date).toEqual("2021-10-30");
                    expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.oneOff.startTime).toEqual("01:00:00");
                    expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.oneOff.endTime).toEqual("02:50:00");
                    return [2];
            }
        });
    }); });
});
describe("test case 6: deleting class with one off schedule", function () {
    var classId;
    var classScheduleId;
    var oneOffScheduleId;
    it("should get one random class id from all classes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getClassesQuery,
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
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
                    return [2];
            }
        });
    }); });
    it("should delete class with id specified", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: deleteClassMutation,
                        variableValues: {
                            id: classId,
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [2];
            }
        });
    }); });
    it("should delete schedule of class with id specified", function () { return __awaiter(void 0, void 0, void 0, function () {
        var classScheduleRepository, q;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(ClassSchedule);
                    return [4, classScheduleRepository.findOne(classScheduleId)];
                case 1:
                    q = _a.sent();
                    expect(q).toBeUndefined();
                    return [2];
            }
        });
    }); });
    it("should delete one-off schedule of class with id specified", function () { return __awaiter(void 0, void 0, void 0, function () {
        var oneOffScheduleRepository, q;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oneOffScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(OneOffSchedule);
                    return [4, oneOffScheduleRepository.findOne(oneOffScheduleId)];
                case 1:
                    q = _a.sent();
                    expect(q).toBeUndefined();
                    return [2];
            }
        });
    }); });
});
describe("test case 7: updating class with repeat schedule", function () {
    var c;
    it("should get one random class id from all classes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getClassesQuery,
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    c = response.data.getClasses[0];
                    expect(response.data.getClasses.length).toEqual(1);
                    expect(response.data.getClasses[0]).toHaveProperty("subject");
                    expect(response.data.getClasses[0]).toHaveProperty("academicYear");
                    expect(c).toBeDefined();
                    return [2];
            }
        });
    }); });
    it("should update subject of class", function () { return __awaiter(void 0, void 0, void 0, function () {
        var subjects, newSubjectId, response, updatedClass;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, getConnection(process.env.NODE_ENV)
                        .getRepository(Subject)
                        .find()];
                case 1:
                    subjects = _b.sent();
                    newSubjectId = subjects[0].id;
                    return [4, testClient({
                            source: updateClassMutation,
                            headers: {
                                authorization: "Bearer " + accessToken,
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
                        })];
                case 2:
                    response = _b.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [4, getConnection(process.env.NODE_ENV)
                            .getRepository(Class)
                            .findOne(c.id, {
                            relations: ["subject"],
                        })];
                case 3:
                    updatedClass = (_b.sent());
                    expect(updatedClass.subject.id).toEqual(newSubjectId);
                    return [2];
            }
        });
    }); });
    it("should update repeat schedule of class", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, updatedClass;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: updateRepeatScheduleMutation,
                        headers: {
                            authorization: "Bearer " + accessToken,
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
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [4, getConnection(process.env.NODE_ENV)
                            .getRepository(Class)
                            .findOne(c.id, { relations: ["schedule", "schedule.repeat"] })];
                case 2:
                    updatedClass = _a.sent();
                    expect(updatedClass).toBeDefined();
                    expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].startTime).toEqual("01:00:00");
                    expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].endTime).toEqual("02:50:00");
                    expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].repeatDays).toContain(1);
                    expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].repeatDays).toContain(2);
                    expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].startDate).toEqual(null);
                    expect(updatedClass === null || updatedClass === void 0 ? void 0 : updatedClass.schedule.repeat[0].endDate).toEqual(null);
                    return [2];
            }
        });
    }); });
});
describe("test case 8: deleting class with repeat schedule", function () {
    var classId;
    var classScheduleId;
    var repeatScheduleId;
    it("should get one random class id from all classes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getClassesQuery,
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
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
                    return [2];
            }
        });
    }); });
    it("should delete class with id specified", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: deleteClassMutation,
                        variableValues: {
                            id: classId,
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [2];
            }
        });
    }); });
    it("should delete schedule of class with id specified", function () { return __awaiter(void 0, void 0, void 0, function () {
        var classScheduleRepository, q;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(ClassSchedule);
                    return [4, classScheduleRepository.findOne(classScheduleId)];
                case 1:
                    q = _a.sent();
                    expect(q).toBeUndefined();
                    return [2];
            }
        });
    }); });
    it("should delete repeat schedule of class with id specified", function () { return __awaiter(void 0, void 0, void 0, function () {
        var repeatScheduleRepository, q;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repeatScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(RepeatSchedule);
                    return [4, repeatScheduleRepository.findOne(repeatScheduleId)];
                case 1:
                    q = _a.sent();
                    expect(q).toBeUndefined();
                    return [2];
            }
        });
    }); });
});
describe("test case 9: create class with repeat schedule", function () {
    var classId;
    it("should create class", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newClassMutation,
                        variableValues: {
                            subjectId: subjectId,
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    classId = response.data.newClass.id;
                    expect(classId).toBeDefined();
                    return [2];
            }
        });
    }); });
    var scheduleId;
    it("should create class schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newClassScheduleMutation,
                        variableValues: {
                            classId: classId,
                            type: "repeat",
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    scheduleId = response.data.newClassSchedule.id;
                    expect(scheduleId).toBeDefined();
                    return [2];
            }
        });
    }); });
    it("should create repeat schedule (1)", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newRepeatScheduleMutation,
                        variableValues: {
                            scheduleId: scheduleId,
                            startTime: "8:00 AM",
                            endTime: "9:50 AM",
                            repeatDays: ["sunday"],
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [2];
            }
        });
    }); });
    it("should create repeat schedule (2)", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newRepeatScheduleMutation,
                        variableValues: {
                            scheduleId: scheduleId,
                            startTime: "8:00 AM",
                            endTime: "9:50 AM",
                            repeatDays: ["monday"],
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [2];
            }
        });
    }); });
    it("should return new class with 2 repeat schedules", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getClassesQuery,
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    expect(response.data.getClasses.length).toEqual(1);
                    expect(response.data.getClasses[0].schedule.repeat.length).toEqual(2);
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=class.resolver.test.js.map