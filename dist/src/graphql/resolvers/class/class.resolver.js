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
import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware, } from "type-graphql";
import { AcademicYear, Class, Subject, User } from "../../../entity";
import { ClassArgs } from "./types";
import { getConnection } from "typeorm";
import { ValidationError, ApolloError } from "apollo-server-errors";
import { authenticationGate } from "../../../middleware";
import { UpdateClassArgs } from "./types/class";
let ClassResolver = class ClassResolver {
    constructor() {
        this.classRespository = getConnection(process.env.NODE_ENV).getRepository(Class);
        this.subjectRepository = getConnection(process.env.NODE_ENV).getRepository(Subject);
        this.userRepository = getConnection(process.env.NODE_ENV).getRepository(User);
        this.academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
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
            throw new ValidationError("invalid subject id");
        newClass.subject = subject;
        if (academicYearId) {
            const academicYear = await this.academicYearRepository.findOne(academicYearId);
            if (!academicYear)
                throw new ValidationError("invalid academic year id");
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
            throw new ApolloError("result not found");
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
            throw new ValidationError("class not found for this user, please check id again");
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
            throw new ValidationError("item not found. please provide a valid id");
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
    Mutation(() => Class),
    UseMiddleware(authenticationGate),
    __param(0, Args()),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClassArgs, Object]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "newClass", null);
__decorate([
    Query(() => [Class]),
    UseMiddleware(authenticationGate),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "getClasses", null);
__decorate([
    Query(() => Class),
    UseMiddleware(authenticationGate),
    __param(0, Arg("id", () => String)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "getClassById", null);
__decorate([
    Query(() => [Class]),
    UseMiddleware(authenticationGate),
    __param(0, Arg("date", () => Date)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, Object]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "getClassesByDate", null);
__decorate([
    Mutation(() => Boolean),
    UseMiddleware(authenticationGate),
    __param(0, Arg("id", () => String)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "deleteClass", null);
__decorate([
    Mutation(() => Boolean),
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
export { ClassResolver };
//# sourceMappingURL=class.resolver.js.map