"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYearResolver = void 0;
const entity_1 = require("../../../entity");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const types_1 = require("./types");
const apollo_server_errors_1 = require("apollo-server-errors");
const middleware_1 = require("../../../middleware");
let AcademicYearResolver = class AcademicYearResolver {
    academicYearRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYear);
    async newAcademicYear({ startDate, endDate }, { user }) {
        const newAcademicYear = this.academicYearRepository.create({
            startDate: startDate,
            endDate: endDate,
        });
        const userRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.User);
        const qUser = await userRepository.findOne(user.id);
        if (!qUser)
            throw new apollo_server_errors_1.ValidationError("invalid user");
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
                throw new apollo_server_errors_1.ValidationError("invalid academic year id");
            if (academicYear?.user.id !== user.id)
                throw new apollo_server_errors_1.ForbiddenError("academic year not found for this user");
            return academicYear;
        }
        return null;
    }
    async deleteAcademicYear(id, { user }) {
        const academicYear = await this.academicYearRepository.findOne(id, {
            relations: ["user"],
        });
        if (!academicYear)
            throw new apollo_server_errors_1.ValidationError("invalid id");
        if (academicYear.user.id !== user.id)
            throw new apollo_server_errors_1.ForbiddenError("academic year not found for this user");
        await this.academicYearRepository.delete(academicYear);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => entity_1.AcademicYear),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.AcademicYearArgs, Object]),
    __metadata("design:returntype", Promise)
], AcademicYearResolver.prototype, "newAcademicYear", null);
__decorate([
    (0, type_graphql_1.Query)(() => [entity_1.AcademicYear]),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicYearResolver.prototype, "getAcademicYears", null);
__decorate([
    (0, type_graphql_1.Query)(() => entity_1.AcademicYear, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id", { nullable: true })),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicYearResolver.prototype, "getAcademicYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicYearResolver.prototype, "deleteAcademicYear", null);
AcademicYearResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AcademicYearResolver);
exports.AcademicYearResolver = AcademicYearResolver;
//# sourceMappingURL=academicYear.resolver.js.map