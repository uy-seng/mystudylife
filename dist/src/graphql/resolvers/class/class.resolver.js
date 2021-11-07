var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware, } from "type-graphql";
import { AcademicYear, Class, Subject, User } from "../../../entity";
import { ClassArgs } from "./types";
import { getConnection } from "typeorm";
import { ValidationError, ApolloError } from "apollo-server-errors";
import { authenticationGate } from "../../../middleware";
import { UpdateClassArgs } from "./types/class";
var ClassResolver = (function () {
    function ClassResolver() {
        this.classRespository = getConnection(process.env.NODE_ENV).getRepository(Class);
        this.subjectRepository = getConnection(process.env.NODE_ENV).getRepository(Subject);
        this.userRepository = getConnection(process.env.NODE_ENV).getRepository(User);
        this.academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
    }
    ClassResolver.prototype.newClass = function (_a, _b) {
        var subjectId = _a.subjectId, building = _a.building, module = _a.module, room = _a.room, teacher = _a.teacher, academicYearId = _a.academicYearId;
        var user = _b.user;
        return __awaiter(this, void 0, void 0, function () {
            var newClass, subject, academicYear, qUser;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        newClass = this.classRespository.create({
                            building: building,
                            module: module,
                            room: room,
                            teacher: teacher,
                        });
                        return [4, this.subjectRepository.findOne(subjectId)];
                    case 1:
                        subject = _c.sent();
                        if (!subject)
                            throw new ValidationError("invalid subject id");
                        newClass.subject = subject;
                        if (!academicYearId) return [3, 3];
                        return [4, this.academicYearRepository.findOne(academicYearId)];
                    case 2:
                        academicYear = _c.sent();
                        if (!academicYear)
                            throw new ValidationError("invalid academic year id");
                        newClass.academicYear = academicYear;
                        _c.label = 3;
                    case 3: return [4, this.userRepository.findOne(user.id)];
                    case 4:
                        qUser = (_c.sent());
                        newClass.user = qUser;
                        return [4, this.classRespository.save(newClass)];
                    case 5: return [2, _c.sent()];
                }
            });
        });
    };
    ClassResolver.prototype.getClasses = function (_a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var classes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.classRespository.find({
                            relations: [
                                "schedule",
                                "schedule.oneOff",
                                "schedule.repeat",
                                "user",
                                "subject",
                                "academicYear",
                                "academicYear.schedule",
                                "academicYear.schedule.dayRotation",
                                "academicYear.schedule.weekRotation",
                            ],
                            where: {
                                user: {
                                    id: user.id,
                                },
                            },
                        })];
                    case 1:
                        classes = _b.sent();
                        return [2, classes];
                }
            });
        });
    };
    ClassResolver.prototype.getClassById = function (id, _a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var q;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.classRespository.findOne(id, {
                            relations: [
                                "schedule",
                                "schedule.oneOff",
                                "schedule.repeat",
                                "academicYear",
                                "user",
                                "subject",
                            ],
                        })];
                    case 1:
                        q = _b.sent();
                        if (!q || q.user.id !== user.id)
                            throw new ApolloError("result not found");
                        return [2, q];
                }
            });
        });
    };
    ClassResolver.prototype.getClassesByDate = function (date, _a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var classes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.classRespository.find({
                            relations: [
                                "schedule",
                                "schedule.oneOff",
                                "schedule.repeat",
                                "user",
                                "academicYear",
                            ],
                            where: {
                                user: {
                                    id: user.id,
                                },
                            },
                        })];
                    case 1:
                        classes = _b.sent();
                        return [2, classes.filter(function (c) {
                                if (c.schedule.type === "oneOff") {
                                    if (c.academicYear)
                                        return (+new Date(c.schedule.oneOff.date) === +date &&
                                            +date >= +new Date(c.academicYear.startDate) &&
                                            +date <= +new Date(c.academicYear.endDate));
                                    return +new Date(c.schedule.oneOff.date) === +date;
                                }
                                else {
                                    if (c.academicYear)
                                        return (c.schedule.repeat.some(function (r) {
                                            return r.repeatDays.includes(new Date(date).getDay());
                                        }) &&
                                            +date >= +new Date(c.academicYear.startDate) &&
                                            +date <= +new Date(c.academicYear.endDate));
                                    return c.schedule.repeat.some(function (r) {
                                        return r.repeatDays.includes(new Date(date).getDay());
                                    });
                                }
                            })];
                }
            });
        });
    };
    ClassResolver.prototype.deleteClass = function (id, _a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.classRespository.findOne(id, {
                            relations: ["user"],
                            where: {
                                user: user.id,
                            },
                        })];
                    case 1:
                        c = _b.sent();
                        if (!c)
                            throw new ValidationError("class not found for this user, please check id again");
                        return [4, this.classRespository.remove(c)];
                    case 2:
                        _b.sent();
                        return [2, true];
                }
            });
        });
    };
    ClassResolver.prototype.updateClass = function (updateContext, _a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var q, updatedSubject, updatedAcademicYear;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.classRespository.findOne(updateContext.id, {
                            relations: ["user", "schedule", "academicYear"],
                        })];
                    case 1:
                        q = _b.sent();
                        return [4, this.subjectRepository.findOne(updateContext.subjectId)];
                    case 2:
                        updatedSubject = _b.sent();
                        return [4, this.academicYearRepository.findOne(updateContext.academicYearId)];
                    case 3:
                        updatedAcademicYear = _b.sent();
                        if (!q || q.user.id !== user.id || !updatedSubject || !updatedAcademicYear)
                            throw new ValidationError("item not found. please provide a valid id");
                        q.building = updateContext.building;
                        q.module = updateContext.module;
                        q.room = updateContext.room;
                        q.teacher = updateContext.teacher;
                        q.academicYear = updatedAcademicYear;
                        q.subject = updatedSubject;
                        return [4, this.classRespository.save(q)];
                    case 4:
                        _b.sent();
                        return [2, true];
                }
            });
        });
    };
    __decorate([
        Mutation(function () { return Class; }),
        UseMiddleware(authenticationGate),
        __param(0, Args()),
        __param(1, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [ClassArgs, Object]),
        __metadata("design:returntype", Promise)
    ], ClassResolver.prototype, "newClass", null);
    __decorate([
        Query(function () { return [Class]; }),
        UseMiddleware(authenticationGate),
        __param(0, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ClassResolver.prototype, "getClasses", null);
    __decorate([
        Query(function () { return Class; }),
        UseMiddleware(authenticationGate),
        __param(0, Arg("id", function () { return String; })),
        __param(1, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], ClassResolver.prototype, "getClassById", null);
    __decorate([
        Query(function () { return [Class]; }),
        UseMiddleware(authenticationGate),
        __param(0, Arg("date", function () { return Date; })),
        __param(1, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Date, Object]),
        __metadata("design:returntype", Promise)
    ], ClassResolver.prototype, "getClassesByDate", null);
    __decorate([
        Mutation(function () { return Boolean; }),
        UseMiddleware(authenticationGate),
        __param(0, Arg("id", function () { return String; })),
        __param(1, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], ClassResolver.prototype, "deleteClass", null);
    __decorate([
        Mutation(function () { return Boolean; }),
        UseMiddleware(authenticationGate),
        __param(0, Args()),
        __param(1, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [UpdateClassArgs, Object]),
        __metadata("design:returntype", Promise)
    ], ClassResolver.prototype, "updateClass", null);
    ClassResolver = __decorate([
        Resolver()
    ], ClassResolver);
    return ClassResolver;
}());
export { ClassResolver };
//# sourceMappingURL=class.resolver.js.map