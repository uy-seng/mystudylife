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
import { AcademicYear, Subject, Task, User } from "../../../entity";
import { authenticationGate } from "../../../middleware";
import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware, } from "type-graphql";
import { getConnection } from "typeorm";
import { TaskArgs, UpdateTaskArgs } from "./types";
import { ValidationError } from "apollo-server-errors";
import { ApolloError } from "apollo-server-errors";
let TaskResolver = class TaskResolver {
    constructor() {
        this.taskRepository = getConnection(process.env.NODE_ENV).getRepository(Task);
        this.subjectRepository = getConnection(process.env.NODE_ENV).getRepository(Subject);
        this.userRepository = getConnection(process.env.NODE_ENV).getRepository(User);
        this.academicYearRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYear);
    }
    async newTask({ subjectId, due_date, detail, title, type, academicYearId }, { user }) {
        const newTask = this.taskRepository.create({
            title: title,
            due_date: due_date,
            detail: detail,
            type: type,
        });
        const subject = await this.subjectRepository.findOne(subjectId);
        if (!subject)
            throw new ValidationError("invalid subject id");
        newTask.subject = subject;
        if (academicYearId) {
            const academicYear = await this.academicYearRepository.findOne(academicYearId);
            if (!academicYear)
                throw new ValidationError("invalid academic year id");
            newTask.academicYear = academicYear;
        }
        const qUser = (await this.userRepository.findOne(user.id));
        newTask.user = qUser;
        return await this.taskRepository.save(newTask);
    }
    async getTasks({ user }) {
        const tasks = await this.taskRepository.find({
            relations: ["user", "subject", "academicYear"],
            where: {
                user: {
                    id: user.id,
                },
            },
        });
        return tasks;
    }
    async getTaskById(id, { user }) {
        const q = await this.taskRepository.findOne(id, {
            relations: ["academicYear", "user", "subject"],
            where: {
                user: {
                    id: user.id,
                },
            },
        });
        if (!q || q.user.id !== user.id)
            throw new ApolloError("result not found");
        return q;
    }
    async getTasksByDate(date, { user }) {
        const tasks = await this.taskRepository.find({
            relations: ["user", "academicYear", "subject"],
            where: {
                user: {
                    id: user.id,
                },
            },
        });
        console.log(new Date(date.toISOString().split("T")[0]));
        return tasks.filter((c) => +new Date(c.due_date) === +new Date(date.toISOString().split("T")[0]));
    }
    async deleteTask(id, { user }) {
        const c = await this.taskRepository.findOne(id, {
            relations: ["user"],
            where: {
                user: user.id,
            },
        });
        if (!c)
            throw new ValidationError("class not found for this user, please check id again");
        await this.taskRepository.remove(c);
        return true;
    }
    async updateTask(updateContext, { user }) {
        const q = await this.taskRepository.findOne(updateContext.id, {
            relations: ["user", "subject", "academicYear"],
        });
        const updatedSubject = await this.subjectRepository.findOne(updateContext.subjectId);
        const updatedAcademicYear = await this.academicYearRepository.findOne(updateContext.academicYearId);
        if (!q || q.user.id !== user.id || !updatedSubject || !updatedAcademicYear)
            throw new ValidationError("item not found. please provide a valid id");
        q.detail = updateContext.detail;
        q.due_date = updateContext.due_date;
        q.title = updateContext.title;
        q.type = updateContext.type;
        q.academicYear = updatedAcademicYear;
        q.subject = updatedSubject;
        await this.taskRepository.save(q);
        return true;
    }
};
__decorate([
    Mutation(() => Task),
    UseMiddleware(authenticationGate),
    __param(0, Args()),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskArgs, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "newTask", null);
__decorate([
    Query(() => [Task]),
    UseMiddleware(authenticationGate),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTasks", null);
__decorate([
    Query(() => Task),
    UseMiddleware(authenticationGate),
    __param(0, Arg("id", () => String)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTaskById", null);
__decorate([
    Query(() => [Task]),
    UseMiddleware(authenticationGate),
    __param(0, Arg("date", () => Date)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTasksByDate", null);
__decorate([
    Mutation(() => Boolean),
    UseMiddleware(authenticationGate),
    __param(0, Arg("id", () => String)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "deleteTask", null);
__decorate([
    Mutation(() => Boolean),
    UseMiddleware(authenticationGate),
    __param(0, Args()),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateTaskArgs, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateTask", null);
TaskResolver = __decorate([
    Resolver()
], TaskResolver);
export { TaskResolver };
//# sourceMappingURL=task.resolver.js.map