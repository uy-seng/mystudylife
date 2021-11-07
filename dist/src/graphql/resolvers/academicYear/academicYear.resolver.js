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
import { AcademicYear, User } from "../../../entity";
import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware, } from "type-graphql";
import { getConnection } from "typeorm";
import { AcademicYearArgs } from "./types";
import { ForbiddenError, ValidationError } from "apollo-server-errors";
import { authenticationGate } from "../../../middleware";
var AcademicYearResolver = (function () {
    function AcademicYearResolver() {
        this.academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
    }
    AcademicYearResolver.prototype.newAcademicYear = function (_a, _b) {
        var startDate = _a.startDate, endDate = _a.endDate;
        var user = _b.user;
        return __awaiter(this, void 0, void 0, function () {
            var newAcademicYear, userRepository, qUser;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        newAcademicYear = this.academicYearRepository.create({
                            startDate: startDate,
                            endDate: endDate,
                        });
                        userRepository = getConnection(process.env.NODE_ENV).getRepository(User);
                        return [4, userRepository.findOne(user.id)];
                    case 1:
                        qUser = _c.sent();
                        if (!qUser)
                            throw new ValidationError("invalid user");
                        newAcademicYear.user = qUser;
                        return [4, this.academicYearRepository.save(newAcademicYear)];
                    case 2: return [2, _c.sent()];
                }
            });
        });
    };
    AcademicYearResolver.prototype.getAcademicYears = function (_a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var academicYears;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.academicYearRepository.find({
                            relations: [
                                "terms",
                                "user",
                                "schedule",
                                "schedule.dayRotation",
                                "schedule.weekRotation",
                            ],
                            where: {
                                user: {
                                    id: user.id,
                                },
                            },
                        })];
                    case 1:
                        academicYears = _b.sent();
                        return [2, academicYears];
                }
            });
        });
    };
    AcademicYearResolver.prototype.getAcademicYear = function (id, _a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var academicYear;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!id) return [3, 2];
                        return [4, this.academicYearRepository.findOne(id, {
                                relations: [
                                    "terms",
                                    "schedule",
                                    "schedule.dayRotation",
                                    "schedule.weekRotation",
                                    "user",
                                ],
                            })];
                    case 1:
                        academicYear = _b.sent();
                        if (!academicYear)
                            throw new ValidationError("invalid academic year id");
                        if ((academicYear === null || academicYear === void 0 ? void 0 : academicYear.user.id) !== user.id)
                            throw new ForbiddenError("academic year not found for this user");
                        return [2, academicYear];
                    case 2: return [2, null];
                }
            });
        });
    };
    AcademicYearResolver.prototype.deleteAcademicYear = function (id, _a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var academicYear;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.academicYearRepository.findOne(id, {
                            relations: ["user"],
                        })];
                    case 1:
                        academicYear = _b.sent();
                        if (!academicYear)
                            throw new ValidationError("invalid id");
                        if (academicYear.user.id !== user.id)
                            throw new ForbiddenError("academic year not found for this user");
                        return [4, this.academicYearRepository.delete(academicYear)];
                    case 2:
                        _b.sent();
                        return [2, true];
                }
            });
        });
    };
    __decorate([
        Mutation(function () { return AcademicYear; }),
        UseMiddleware(authenticationGate),
        __param(0, Args()),
        __param(1, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [AcademicYearArgs, Object]),
        __metadata("design:returntype", Promise)
    ], AcademicYearResolver.prototype, "newAcademicYear", null);
    __decorate([
        Query(function () { return [AcademicYear]; }),
        UseMiddleware(authenticationGate),
        __param(0, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AcademicYearResolver.prototype, "getAcademicYears", null);
    __decorate([
        Query(function () { return AcademicYear; }, { nullable: true }),
        UseMiddleware(authenticationGate),
        __param(0, Arg("id", { nullable: true })),
        __param(1, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], AcademicYearResolver.prototype, "getAcademicYear", null);
    __decorate([
        Mutation(function () { return Boolean; }),
        UseMiddleware(authenticationGate),
        __param(0, Arg("id")),
        __param(1, Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], AcademicYearResolver.prototype, "deleteAcademicYear", null);
    AcademicYearResolver = __decorate([
        Resolver()
    ], AcademicYearResolver);
    return AcademicYearResolver;
}());
export { AcademicYearResolver };
//# sourceMappingURL=academicYear.resolver.js.map