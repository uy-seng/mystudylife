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
import { ForbiddenError, ValidationError, ApolloError, } from "apollo-server-errors";
import { Subject, AcademicYear, User } from "../../../entity";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware, } from "type-graphql";
import { getConnection } from "typeorm";
import { authenticationGate } from "../../../middleware";
var SubjectResolver = (function () {
    function SubjectResolver() {
        this.subjectRepository = getConnection(process.env.NODE_ENV).getRepository(Subject);
        this.academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
        this.userRepository = getConnection(process.env.NODE_ENV).getRepository(User);
    }
    SubjectResolver.prototype.newSubject = function (name, academicYearId, _a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var partialSubject, newSubject, academicYear, currentUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        partialSubject = this.subjectRepository.create({
                            name: name,
                        });
                        return [4, this.subjectRepository.save(partialSubject)];
                    case 1:
                        newSubject = _b.sent();
                        if (!academicYearId) return [3, 3];
                        return [4, this.academicYearRepository.findOne(academicYearId)];
                    case 2:
                        academicYear = _b.sent();
                        if (!academicYear)
                            throw new ValidationError("invalid academic year id");
                        newSubject.academicYear = academicYear;
                        _b.label = 3;
                    case 3: return [4, this.userRepository.findOne(user.id)];
                    case 4:
                        currentUser = (_b.sent());
                        newSubject.user = currentUser;
                        return [4, this.subjectRepository.save(newSubject)];
                    case 5: return [2, _b.sent()];
                }
            });
        });
    };
    SubjectResolver.prototype.deleteSubject = function (id, _a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var subject;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.subjectRepository.findOne(id, {
                            relations: ["user"],
                        })];
                    case 1:
                        subject = _b.sent();
                        if (!subject)
                            throw new ValidationError("invalid id");
                        if (subject.user.id !== user.id)
                            throw new ForbiddenError("subject not found for this user");
                        return [4, this.subjectRepository.delete(subject)];
                    case 2:
                        _b.sent();
                        return [2, true];
                }
            });
        });
    };
    SubjectResolver.prototype.getSubjects = function (_a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var subjects;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.subjectRepository.find({
                            relations: ["academicYear"],
                            where: {
                                user: {
                                    id: user.id,
                                },
                            },
                        })];
                    case 1:
                        subjects = _b.sent();
                        return [2, subjects];
                }
            });
        });
    };
    SubjectResolver.prototype.getSubject = function (id, _a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var subject;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.subjectRepository.findOne(id, {
                            relations: ["academicYear"],
                        })];
                    case 1:
                        subject = _b.sent();
                        if (!subject)
                            throw new ValidationError("invalid subject id");
                        if ((subject === null || subject === void 0 ? void 0 : subject.user.id) !== user.id)
                            throw new ForbiddenError("academic year not found for this user");
                        return [2, subject];
                }
            });
        });
    };
    SubjectResolver.prototype.updateSubject = function (id, name, academicYearId, _a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var q, toBeUpdatedAcademicYear;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.subjectRepository.findOne(id, {
                            relations: ["user"],
                            where: {
                                user: {
                                    id: user.id,
                                },
                            },
                        })];
                    case 1:
                        q = _b.sent();
                        if (!q)
                            throw new ApolloError("item not found. please provide a valid id");
                        q.name = name;
                        if (!(academicYearId &&
                            (!q.academicYear || q.academicYear.id !== academicYearId))) return [3, 3];
                        return [4, this.academicYearRepository.findOne(academicYearId)];
                    case 2:
                        toBeUpdatedAcademicYear = _b.sent();
                        if (!toBeUpdatedAcademicYear)
                            throw new ApolloError("item not found. pleaase provide a valid academic year id");
                        q.academicYear = toBeUpdatedAcademicYear;
                        _b.label = 3;
                    case 3: return [4, this.subjectRepository.save(q)];
                    case 4:
                        _b.sent();
                        return [2, true];
                }
            });
        });
    };
    __decorate([
        Mutation(function () { return Subject; }),
        UseMiddleware(authenticationGate),
        __param(0, Arg("name")),
        __param(1, Arg("academicYearId", { nullable: true })),
        __param(2, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, Object]),
        __metadata("design:returntype", Promise)
    ], SubjectResolver.prototype, "newSubject", null);
    __decorate([
        Mutation(function () { return Boolean; }),
        UseMiddleware(authenticationGate),
        __param(0, Arg("id")),
        __param(1, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], SubjectResolver.prototype, "deleteSubject", null);
    __decorate([
        Query(function () { return [Subject]; }),
        UseMiddleware(authenticationGate),
        __param(0, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], SubjectResolver.prototype, "getSubjects", null);
    __decorate([
        Query(function () { return Subject; }),
        UseMiddleware(authenticationGate),
        __param(0, Arg("id")),
        __param(1, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], SubjectResolver.prototype, "getSubject", null);
    __decorate([
        Mutation(function () { return Boolean; }),
        UseMiddleware(authenticationGate),
        __param(0, Arg("id", function () { return String; })),
        __param(1, Arg("name")),
        __param(2, Arg("academicYearId", { nullable: true })),
        __param(3, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, Object]),
        __metadata("design:returntype", Promise)
    ], SubjectResolver.prototype, "updateSubject", null);
    SubjectResolver = __decorate([
        Resolver()
    ], SubjectResolver);
    return SubjectResolver;
}());
export { SubjectResolver };
//# sourceMappingURL=subject.resolver.js.map