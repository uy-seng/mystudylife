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
import { AcademicYear, Subject } from "../../../entity";
import { loginMutation, newAcademicYearMutation, newScheduleMutation, newSubjectMutation, registerMutation, } from "../../../graphql/mutation";
import { getSubjectsQuery, meQuery } from "../../../graphql/query";
import { getConnection } from "typeorm";
import { testClient } from "../../../../test/graphqlTestClient";
import faker from "faker";
import { updateSubjectMutation, deleteSubjectMutation, } from "../../../graphql/mutation/subject";
import { asyncForEach } from "../../../helper";
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
describe("test case 1: create subject with no academic year", function () {
    var subjectId;
    it("should create subject with no academic year", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newSubjectMutation,
                        variableValues: {
                            name: "Subject 1",
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
    it("should display subject with no academic year", function () { return __awaiter(void 0, void 0, void 0, function () {
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
                    expect(subject === null || subject === void 0 ? void 0 : subject.academicYear).toBeNull();
                    return [2];
            }
        });
    }); });
});
describe("test case 2: create subject with academic year", function () {
    var subjectId;
    it("should create subject with academic year", function () { return __awaiter(void 0, void 0, void 0, function () {
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
describe("test case 3: should be able to fetch subjects", function () {
    it("should fetch all subjects", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getSubjectsQuery,
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    expect(response.data.getSubjects.length).toEqual(2);
                    expect(response.data.getSubjects[0]).toHaveProperty("academicYear");
                    return [2];
            }
        });
    }); });
});
describe("test case 4: should be able to update subject", function () {
    var subjectId;
    it("should fetch 1 subject with name and no academic year", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getSubjectsQuery,
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    expect(response.data.getSubjects.filter(function (s) { return s.academicYear === null; })
                        .length).toEqual(1);
                    subjectId = response.data.getSubjects.filter(function (s) { return s.academicYear === null; })[0];
                    expect(subjectId).toBeDefined();
                    return [2];
            }
        });
    }); });
    it("should update name of subject", function () { return __awaiter(void 0, void 0, void 0, function () {
        var subject, response, updatedSubject;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, getConnection(process.env.NODE_ENV)
                        .getRepository(Subject)
                        .findOne(subjectId, { relations: ["academicYear"] })];
                case 1:
                    subject = _b.sent();
                    expect(subject).toBeDefined();
                    return [4, testClient({
                            source: updateSubjectMutation,
                            variableValues: {
                                id: subject === null || subject === void 0 ? void 0 : subject.id,
                                academicYearId: ((_a = subject === null || subject === void 0 ? void 0 : subject.academicYear) === null || _a === void 0 ? void 0 : _a.id) || null,
                                name: "meow",
                            },
                            headers: {
                                authorization: "Bearer " + accessToken,
                            },
                        })];
                case 2:
                    response = _b.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [4, getConnection(process.env.NODE_ENV)
                            .getRepository(Subject)
                            .findOne(subjectId, { relations: ["academicYear"] })];
                case 3:
                    updatedSubject = _b.sent();
                    expect(updatedSubject === null || updatedSubject === void 0 ? void 0 : updatedSubject.name).toEqual("meow");
                    return [2];
            }
        });
    }); });
    it("should update academic year of subject", function () { return __awaiter(void 0, void 0, void 0, function () {
        var subject, response, updatedSubject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, getConnection(process.env.NODE_ENV)
                        .getRepository(Subject)
                        .findOne(subjectId, { relations: ["academicYear"] })];
                case 1:
                    subject = _a.sent();
                    return [4, testClient({
                            source: updateSubjectMutation,
                            variableValues: {
                                id: subject === null || subject === void 0 ? void 0 : subject.id,
                                academicYearId: academicYearId,
                                name: subject === null || subject === void 0 ? void 0 : subject.name,
                            },
                            headers: {
                                authorization: "Bearer " + accessToken,
                            },
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [4, getConnection(process.env.NODE_ENV)
                            .getRepository(Subject)
                            .findOne(subjectId, { relations: ["academicYear"] })];
                case 3:
                    updatedSubject = _a.sent();
                    expect(updatedSubject).toHaveProperty("academicYear");
                    expect(updatedSubject === null || updatedSubject === void 0 ? void 0 : updatedSubject.academicYear.id).toEqual(academicYearId);
                    return [2];
            }
        });
    }); });
});
describe("test case 5: deleting subject", function () {
    it("should delete all subjects", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, subjects;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getSubjectsQuery,
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    return [4, asyncForEach(response.data.getSubjects, function (subject) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, testClient({
                                            source: deleteSubjectMutation,
                                            variableValues: {
                                                id: subject.id,
                                            },
                                            headers: {
                                                authorization: "Bearer " + accessToken,
                                            },
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    return [4, getConnection(process.env.NODE_ENV)
                            .getRepository(Subject)
                            .find()];
                case 3:
                    subjects = _a.sent();
                    expect(subjects.length).toEqual(0);
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=subject.resolve.test.js.map