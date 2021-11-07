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
import { AcademicYear, User } from "../../../entity";
import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware, } from "type-graphql";
import { getConnection } from "typeorm";
import { AcademicYearArgs } from "./types";
import { ForbiddenError, ValidationError } from "apollo-server-errors";
import { authenticationGate } from "../../../middleware";
let AcademicYearResolver = class AcademicYearResolver {
    constructor() {
        this.academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
    }
    async newAcademicYear({ startDate, endDate }, { user }) {
        const newAcademicYear = this.academicYearRepository.create({
            startDate: startDate,
            endDate: endDate,
        });
        const userRepository = getConnection(process.env.NODE_ENV).getRepository(User);
        const qUser = await userRepository.findOne(user.id);
        if (!qUser)
            throw new ValidationError("invalid user");
        newAcademicYear.user = qUser;
        return await this.academicYearRepository.save(newAcademicYear);
    }
    async getAcademicYears({ user }) {
        const academicYears = await this.academicYearRepository.find({
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
        });
        return academicYears;
    }
    async getAcademicYear(id, { user }) {
        if (id) {
            const academicYear = await this.academicYearRepository.findOne(id, {
                relations: [
                    "terms",
                    "schedule",
                    "schedule.dayRotation",
                    "schedule.weekRotation",
                    "user",
                ],
            });
            if (!academicYear)
                throw new ValidationError("invalid academic year id");
            if ((academicYear === null || academicYear === void 0 ? void 0 : academicYear.user.id) !== user.id)
                throw new ForbiddenError("academic year not found for this user");
            return academicYear;
        }
        return null;
    }
    async deleteAcademicYear(id, { user }) {
        const academicYear = await this.academicYearRepository.findOne(id, {
            relations: ["user"],
        });
        if (!academicYear)
            throw new ValidationError("invalid id");
        if (academicYear.user.id !== user.id)
            throw new ForbiddenError("academic year not found for this user");
        await this.academicYearRepository.delete(academicYear);
        return true;
    }
};
__decorate([
    Mutation(() => AcademicYear),
    UseMiddleware(authenticationGate),
    __param(0, Args()),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicYearArgs, Object]),
    __metadata("design:returntype", Promise)
], AcademicYearResolver.prototype, "newAcademicYear", null);
__decorate([
    Query(() => [AcademicYear]),
    UseMiddleware(authenticationGate),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicYearResolver.prototype, "getAcademicYears", null);
__decorate([
    Query(() => AcademicYear, { nullable: true }),
    UseMiddleware(authenticationGate),
    __param(0, Arg("id", { nullable: true })),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicYearResolver.prototype, "getAcademicYear", null);
__decorate([
    Mutation(() => Boolean),
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
export { AcademicYearResolver };
//# sourceMappingURL=academicYear.resolver.js.map