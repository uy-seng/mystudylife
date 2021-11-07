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
import { AcademicYear, AcademicYearSchedule, Term, WeekRotationSchedule, } from "../../../entity";
import { loginMutation, newAcademicYearMutation, newPartialDayRotationMutation, newPartialWeekRotationMutation, newScheduleMutation, newTermMutation, registerMutation, } from "../../../graphql/mutation";
import { deleteAcademicYearMutation } from "../../../graphql/mutation/academicYear";
import { getAcademicYearsQuery, meQuery } from "../../../graphql/query";
import { getConnection } from "typeorm";
import { testClient } from "../../../../test/graphqlTestClient";
import faker from "faker";
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
describe("test case 1: create academic year with fixed schedule and term", function () {
    var academicYearId;
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
    var termIds;
    it("should create terms", function () { return __awaiter(void 0, void 0, void 0, function () {
        var terms;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    terms = [
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
                    return [4, Promise.all(terms.map(function (term) { return __awaiter(void 0, void 0, void 0, function () {
                            var response;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, testClient({
                                            source: newTermMutation,
                                            variableValues: {
                                                name: term.name,
                                                startDate: term.startDate,
                                                endDate: term.endDate,
                                                academicYearId: academicYearId,
                                            },
                                        })];
                                    case 1:
                                        response = _a.sent();
                                        expect(response.errors).toBeUndefined();
                                        expect(response.data).not.toBeNull();
                                        return [2, response.data.newTerm.id];
                                }
                            });
                        }); }))];
                case 1:
                    termIds = _a.sent();
                    expect(termIds.every(function (termId) { return typeof termId === "string"; })).toEqual(true);
                    return [2];
            }
        });
    }); });
    it("should show academic year with fixed schedule and terms", function () { return __awaiter(void 0, void 0, void 0, function () {
        var academicYearRepository, academicYear;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
                    return [4, academicYearRepository.findOne(academicYearId, {
                            relations: ["schedule", "terms"],
                        })];
                case 1:
                    academicYear = (_a.sent());
                    expect(academicYear).toHaveProperty("schedule");
                    expect(academicYear).toHaveProperty("terms");
                    expect(academicYear.schedule).not.toBeNull();
                    expect(academicYear.terms).not.toBeNull();
                    expect(academicYear.schedule.id).toEqual(scheduleId);
                    academicYear.terms.forEach(function (term) {
                        expect(termIds.includes(term.id)).toEqual(true);
                    });
                    return [2];
            }
        });
    }); });
    it("should delete academic year along with fixed schedule and term", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, academicYearRepository, academicYear, scheduleRepository, schedule, termRepository;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: deleteAcademicYearMutation,
                        variableValues: {
                            id: academicYearId,
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
                    return [4, academicYearRepository.findOne(academicYearId)];
                case 2:
                    academicYear = _a.sent();
                    expect(academicYear).toBeUndefined();
                    scheduleRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYearSchedule);
                    return [4, scheduleRepository.findOne(scheduleId)];
                case 3:
                    schedule = _a.sent();
                    expect(schedule).toBeUndefined();
                    termRepository = getConnection(process.env.NODE_ENV).getRepository(Term);
                    termIds.forEach(function (termId) { return __awaiter(void 0, void 0, void 0, function () {
                        var term;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, termRepository.findOne(termId)];
                                case 1:
                                    term = _a.sent();
                                    expect(term).toBeUndefined();
                                    return [2];
                            }
                        });
                    }); });
                    return [2];
            }
        });
    }); });
});
describe("test case 2: create academic year with week rotation schedule", function () {
    var academicYearId;
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
    it("should create week rotation schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newScheduleMutation,
                        variableValues: {
                            type: "weekRotation",
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
    var weekRotationScheduleId;
    it("should create partial week rotation schedule and assign it to week rotation schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newPartialWeekRotationMutation,
                        variableValues: {
                            numOfWeek: 2,
                            startWeek: 1,
                            scheduleId: scheduleId,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    weekRotationScheduleId = response.data.newPartialWeekRotation.id;
                    return [2];
            }
        });
    }); });
    it("should show academic year with week rotation schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var academicYearRepository, academicYear;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
                    return [4, academicYearRepository.findOne(academicYearId, {
                            relations: ["schedule", "schedule.dayRotation", "schedule.weekRotation"],
                        })];
                case 1:
                    academicYear = (_a.sent());
                    expect(academicYear).toHaveProperty("schedule");
                    expect(academicYear.schedule).not.toBeNull();
                    expect(academicYear.schedule.weekRotation).not.toBeNull();
                    expect(academicYear.schedule.id).toEqual(scheduleId);
                    expect(academicYear.schedule.weekRotation.id).toEqual(weekRotationScheduleId);
                    return [2];
            }
        });
    }); });
    it("should delete academic year along with week rotation schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, academicYearRepository, academicYear, scheduleRepository, schedule, weekRotationScheduleRepository, weekRotationSchedule;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: deleteAcademicYearMutation,
                        variableValues: {
                            id: academicYearId,
                        },
                        headers: {
                            authorization: "Bearer " + accessToken,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
                    return [4, academicYearRepository.findOne(academicYearId)];
                case 2:
                    academicYear = _a.sent();
                    expect(academicYear).toBeUndefined();
                    scheduleRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYearSchedule);
                    return [4, scheduleRepository.findOne(scheduleId)];
                case 3:
                    schedule = _a.sent();
                    expect(schedule).toBeUndefined();
                    weekRotationScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(WeekRotationSchedule);
                    return [4, weekRotationScheduleRepository.findOne(weekRotationScheduleId)];
                case 4:
                    weekRotationSchedule = _a.sent();
                    expect(weekRotationSchedule).toBeUndefined();
                    return [2];
            }
        });
    }); });
});
describe("test case 3: create academic year with day rotation schedule", function () {
    var academicYearId;
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
    it("should create day rotation schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newScheduleMutation,
                        variableValues: {
                            type: "dayRotation",
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
    var dayRotationScheduleId;
    it("should create partial day rotation schedule and assign it to day rotation schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: newPartialDayRotationMutation,
                        variableValues: {
                            startDay: 2,
                            numOfDay: 1,
                            repeatDays: [1, 2, 3, 4],
                            scheduleId: scheduleId,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.errors).toBeUndefined();
                    expect(response.data).not.toBeNull();
                    dayRotationScheduleId = response.data.newPartialDayRotation.id;
                    return [2];
            }
        });
    }); });
    it("should show academic year with week rotation schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var academicYearRepository, academicYear;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
                    return [4, academicYearRepository.findOne(academicYearId, {
                            relations: ["schedule", "schedule.dayRotation", "schedule.weekRotation"],
                        })];
                case 1:
                    academicYear = (_a.sent());
                    expect(academicYear).toHaveProperty("schedule");
                    expect(academicYear.schedule).not.toBeNull();
                    expect(academicYear.schedule.dayRotation).not.toBeNull();
                    expect(academicYear.schedule.id).toEqual(scheduleId);
                    expect(academicYear.schedule.dayRotation.id).toEqual(dayRotationScheduleId);
                    return [2];
            }
        });
    }); });
});
describe("test case 4: fetching academic years", function () {
    it("should fetch all academic years", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testClient({
                        source: getAcademicYearsQuery,
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
//# sourceMappingURL=academicYear.test.js.map