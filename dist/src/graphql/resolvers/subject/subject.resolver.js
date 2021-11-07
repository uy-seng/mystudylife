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
import { ForbiddenError, ValidationError, ApolloError, } from "apollo-server-errors";
import { Subject, AcademicYear, User } from "../../../entity";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware, } from "type-graphql";
import { getConnection } from "typeorm";
import { authenticationGate } from "../../../middleware";
let SubjectResolver = class SubjectResolver {
    constructor() {
        this.subjectRepository = getConnection(process.env.NODE_ENV).getRepository(Subject);
        this.academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
        this.userRepository = getConnection(process.env.NODE_ENV).getRepository(User);
    }
    async newSubject(name, academicYearId, { user }) {
        const partialSubject = this.subjectRepository.create({
            name: name,
        });
        const newSubject = await this.subjectRepository.save(partialSubject);
        if (academicYearId) {
            const academicYear = await this.academicYearRepository.findOne(academicYearId);
            if (!academicYear)
                throw new ValidationError("invalid academic year id");
            newSubject.academicYear = academicYear;
        }
        const currentUser = (await this.userRepository.findOne(user.id));
        newSubject.user = currentUser;
        return await this.subjectRepository.save(newSubject);
    }
    async deleteSubject(id, { user }) {
        const subject = await this.subjectRepository.findOne(id, {
            relations: ["user"],
        });
        if (!subject)
            throw new ValidationError("invalid id");
        if (subject.user.id !== user.id)
            throw new ForbiddenError("subject not found for this user");
        await this.subjectRepository.delete(subject);
        return true;
    }
    async getSubjects({ user }) {
        const subjects = await this.subjectRepository.find({
            relations: ["academicYear"],
            where: {
                user: {
                    id: user.id,
                },
            },
        });
        return subjects;
    }
    async getSubject(id, { user }) {
        const subject = await this.subjectRepository.findOne(id, {
            relations: ["academicYear"],
        });
        if (!subject)
            throw new ValidationError("invalid subject id");
        if ((subject === null || subject === void 0 ? void 0 : subject.user.id) !== user.id)
            throw new ForbiddenError("academic year not found for this user");
        return subject;
    }
    async updateSubject(id, name, academicYearId, { user }) {
        const q = await this.subjectRepository.findOne(id, {
            relations: ["user"],
            where: {
                user: {
                    id: user.id,
                },
            },
        });
        if (!q)
            throw new ApolloError("item not found. please provide a valid id");
        q.name = name;
        if (academicYearId &&
            (!q.academicYear || q.academicYear.id !== academicYearId)) {
            const toBeUpdatedAcademicYear = await this.academicYearRepository.findOne(academicYearId);
            if (!toBeUpdatedAcademicYear)
                throw new ApolloError("item not found. pleaase provide a valid academic year id");
            q.academicYear = toBeUpdatedAcademicYear;
        }
        await this.subjectRepository.save(q);
        return true;
    }
};
__decorate([
    Mutation(() => Subject),
    UseMiddleware(authenticationGate),
    __param(0, Arg("name")),
    __param(1, Arg("academicYearId", { nullable: true })),
    __param(2, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], SubjectResolver.prototype, "newSubject", null);
__decorate([
    Mutation(() => Boolean),
    UseMiddleware(authenticationGate),
    __param(0, Arg("id")),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubjectResolver.prototype, "deleteSubject", null);
__decorate([
    Query(() => [Subject]),
    UseMiddleware(authenticationGate),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubjectResolver.prototype, "getSubjects", null);
__decorate([
    Query(() => Subject),
    UseMiddleware(authenticationGate),
    __param(0, Arg("id")),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubjectResolver.prototype, "getSubject", null);
__decorate([
    Mutation(() => Boolean),
    UseMiddleware(authenticationGate),
    __param(0, Arg("id", () => String)),
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
export { SubjectResolver };
//# sourceMappingURL=subject.resolver.js.map