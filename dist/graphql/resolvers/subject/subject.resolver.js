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
exports.SubjectResolver = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const entity_1 = require("../../../entity");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const middleware_1 = require("../../../middleware");
let SubjectResolver = class SubjectResolver {
    constructor() {
        this.subjectRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.Subject);
        this.academicYearRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYear);
        this.userRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.User);
        this.termRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.Term);
    }
    async newSubject(name, academicYearId, termId, { user }) {
        const partialSubject = this.subjectRepository.create({
            name: name
        });
        const newSubject = await this.subjectRepository.save(partialSubject);
        if (academicYearId) {
            const academicYear = await this.academicYearRepository.findOne(academicYearId);
            if (!academicYear)
                throw new apollo_server_errors_1.ValidationError("invalid academic year id");
            newSubject.academicYear = academicYear;
        }
        if (termId) {
            const term = await this.termRepository.findOne(termId);
            if (!term)
                throw new apollo_server_errors_1.ValidationError("invalid term id");
            newSubject.term = term;
        }
        const currentUser = (await this.userRepository.findOne(user.id));
        newSubject.user = currentUser;
        return await this.subjectRepository.save(newSubject);
    }
    async deleteSubject(id, { user }) {
        const subject = await this.subjectRepository.findOne(id, {
            relations: ["user"]
        });
        if (!subject)
            throw new apollo_server_errors_1.ValidationError("invalid id");
        if (subject.user.id !== user.id)
            throw new apollo_server_errors_1.ForbiddenError("subject not found for this user");
        await this.subjectRepository.delete(subject);
        return true;
    }
    async getSubjects({ user }) {
        const subjects = await this.subjectRepository.find({
            relations: ["academicYear", "term"],
            where: {
                user: {
                    id: user.id
                }
            }
        });
        return subjects;
    }
    async getSubject(id, { user }) {
        const subject = await this.subjectRepository.findOne(id, {
            relations: ["academicYear"]
        });
        if (!subject)
            throw new apollo_server_errors_1.ValidationError("invalid subject id");
        if ((subject === null || subject === void 0 ? void 0 : subject.user.id) !== user.id)
            throw new apollo_server_errors_1.ForbiddenError("academic year not found for this user");
        return subject;
    }
    async updateSubject(id, name, academicYearId, termId, { user }) {
        const q = await this.subjectRepository.findOne(id, {
            relations: ["user", "academicYear", "term"],
            where: {
                user: {
                    id: user.id
                }
            }
        });
        if (!q)
            throw new apollo_server_errors_1.ApolloError("item not found. please provide a valid id");
        q.name = name;
        if (academicYearId &&
            (!q.academicYear || q.academicYear.id !== academicYearId)) {
            const toBeUpdatedAcademicYear = await this.academicYearRepository.findOne(academicYearId);
            if (!toBeUpdatedAcademicYear)
                throw new apollo_server_errors_1.ApolloError("item not found. pleaase provide a valid academic year id");
            q.academicYear = toBeUpdatedAcademicYear;
        }
        if (termId && (!q.term || q.term.id !== termId)) {
            const toBeUpdatedTerm = await this.termRepository.findOne(termId);
            if (!toBeUpdatedTerm)
                throw new apollo_server_errors_1.ApolloError("item not found. please provide a valid term id");
            q.term = toBeUpdatedTerm;
        }
        await this.subjectRepository.save(q);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => entity_1.Subject),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("academicYearId", { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("termId", { nullable: true })),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], SubjectResolver.prototype, "newSubject", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubjectResolver.prototype, "deleteSubject", null);
__decorate([
    (0, type_graphql_1.Query)(() => [entity_1.Subject]),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubjectResolver.prototype, "getSubjects", null);
__decorate([
    (0, type_graphql_1.Query)(() => entity_1.Subject),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubjectResolver.prototype, "getSubject", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Arg)("name")),
    __param(2, (0, type_graphql_1.Arg)("academicYearId", { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)("termId", { nullable: true })),
    __param(4, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], SubjectResolver.prototype, "updateSubject", null);
SubjectResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], SubjectResolver);
exports.SubjectResolver = SubjectResolver;
//# sourceMappingURL=subject.resolver.js.map