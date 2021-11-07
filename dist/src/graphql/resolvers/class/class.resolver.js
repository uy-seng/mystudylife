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
exports.ClassResolver = void 0;
const type_graphql_1 = require("type-graphql");
const entity_1 = require("../../../entity");
const types_1 = require("./types");
const typeorm_1 = require("typeorm");
const apollo_server_errors_1 = require("apollo-server-errors");
const middleware_1 = require("../../../middleware");
const class_1 = require("./types/class");
let ClassResolver = class ClassResolver {
    constructor() {
        this.classRespository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.Class);
        this.subjectRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.Subject);
        this.userRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.User);
        this.academicYearRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYear);
    }
    async newClass({ subjectId, building, module, room, teacher, academicYearId }, { user }) {
        const newClass = this.classRespository.create({
            building: building,
            module: module,
            room: room,
            teacher: teacher,
        });
        const subject = await this.subjectRepository.findOne(subjectId);
        if (!subject)
            throw new apollo_server_errors_1.ValidationError("invalid subject id");
        newClass.subject = subject;
        if (academicYearId) {
            const academicYear = await this.academicYearRepository.findOne(academicYearId);
            if (!academicYear)
                throw new apollo_server_errors_1.ValidationError("invalid academic year id");
            newClass.academicYear = academicYear;
        }
        const qUser = (await this.userRepository.findOne(user.id));
        newClass.user = qUser;
        return await this.classRespository.save(newClass);
    }
    async getClasses({ user }) {
        const classes = await this.classRespository.find({
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
        });
        return classes;
    }
    async getClassById(id, { user }) {
        const q = await this.classRespository.findOne(id, {
            relations: [
                "schedule",
                "schedule.oneOff",
                "schedule.repeat",
                "academicYear",
                "user",
                "subject",
            ],
        });
        if (!q || q.user.id !== user.id)
            throw new apollo_server_errors_1.ApolloError("result not found");
        return q;
    }
    async getClassesByDate(date, { user }) {
        const classes = await this.classRespository.find({
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
        });
        return classes.filter((c) => {
            if (c.schedule.type === "oneOff") {
                if (c.academicYear)
                    return (+new Date(c.schedule.oneOff.date) === +date &&
                        +date >= +new Date(c.academicYear.startDate) &&
                        +date <= +new Date(c.academicYear.endDate));
                return +new Date(c.schedule.oneOff.date) === +date;
            }
            else {
                if (c.academicYear)
                    return (c.schedule.repeat.some((r) => r.repeatDays.includes(new Date(date).getDay())) &&
                        +date >= +new Date(c.academicYear.startDate) &&
                        +date <= +new Date(c.academicYear.endDate));
                return c.schedule.repeat.some((r) => r.repeatDays.includes(new Date(date).getDay()));
            }
        });
    }
    async deleteClass(id, { user }) {
        const c = await this.classRespository.findOne(id, {
            relations: ["user"],
            where: {
                user: user.id,
            },
        });
        if (!c)
            throw new apollo_server_errors_1.ValidationError("class not found for this user, please check id again");
        await this.classRespository.remove(c);
        return true;
    }
    async updateClass(updateContext, { user }) {
        const q = await this.classRespository.findOne(updateContext.id, {
            relations: ["user", "schedule", "academicYear"],
        });
        const updatedSubject = await this.subjectRepository.findOne(updateContext.subjectId);
        const updatedAcademicYear = await this.academicYearRepository.findOne(updateContext.academicYearId);
        if (!q || q.user.id !== user.id || !updatedSubject || !updatedAcademicYear)
            throw new apollo_server_errors_1.ValidationError("item not found. please provide a valid id");
        q.building = updateContext.building;
        q.module = updateContext.module;
        q.room = updateContext.room;
        q.teacher = updateContext.teacher;
        q.academicYear = updatedAcademicYear;
        q.subject = updatedSubject;
        await this.classRespository.save(q);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => entity_1.Class),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.ClassArgs, Object]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "newClass", null);
__decorate([
    (0, type_graphql_1.Query)(() => [entity_1.Class]),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "getClasses", null);
__decorate([
    (0, type_graphql_1.Query)(() => entity_1.Class),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "getClassById", null);
__decorate([
    (0, type_graphql_1.Query)(() => [entity_1.Class]),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("date", () => Date)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, Object]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "getClassesByDate", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "deleteClass", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_1.UpdateClassArgs, Object]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "updateClass", null);
ClassResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ClassResolver);
exports.ClassResolver = ClassResolver;
//# sourceMappingURL=class.resolver.js.map