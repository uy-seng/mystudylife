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
exports.TaskResolver = void 0;
const entity_1 = require("../../../entity");
const middleware_1 = require("../../../middleware");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const types_1 = require("./types");
const apollo_server_errors_1 = require("apollo-server-errors");
const apollo_server_errors_2 = require("apollo-server-errors");
let TaskResolver = class TaskResolver {
    constructor() {
        this.taskRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.Task);
        this.subjectRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.Subject);
        this.userRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.User);
        this.academicYearRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYear);
    }
    async newTask({ subjectId, due_date, detail, title, type, academicYearId }, { user }) {
        const newTask = this.taskRepository.create({
            title: title,
            due_date: due_date,
            detail: detail,
            type: type,
            completed: 0
        });
        const subject = await this.subjectRepository.findOne(subjectId);
        if (!subject)
            throw new apollo_server_errors_1.ValidationError("invalid subject id");
        newTask.subject = subject;
        if (academicYearId) {
            const academicYear = await this.academicYearRepository.findOne(academicYearId);
            if (!academicYear)
                throw new apollo_server_errors_1.ValidationError("invalid academic year id");
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
        return tasks.filter(task => task.completed !== 100);
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
            throw new apollo_server_errors_2.ApolloError("result not found");
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
            throw new apollo_server_errors_1.ValidationError("class not found for this user, please check id again");
        await this.taskRepository.remove(c);
        return true;
    }
    async updateTask(updateContext, { user }) {
        const q = await this.taskRepository.findOne(updateContext.id, {
            relations: ["user", "subject", "academicYear"],
        });
        const updatedSubject = await this.subjectRepository.findOne(updateContext.subjectId);
        const updatedAcademicYear = updateContext.academicYearId ? await this.academicYearRepository.findOne(updateContext.academicYearId) : null;
        if (!q || q.user.id !== user.id || (updateContext.subjectId && !updatedSubject) || (updateContext.academicYearId && !updatedAcademicYear))
            throw new apollo_server_errors_1.ValidationError("item not found. please provide a valid id");
        q.detail = updateContext.detail;
        q.due_date = updateContext.due_date;
        q.title = updateContext.title;
        q.type = updateContext.type;
        if (updatedAcademicYear)
            q.academicYear = updatedAcademicYear;
        if (updatedSubject)
            q.subject = updatedSubject;
        if (updateContext.completed) {
            q.completed = updateContext.completed;
        }
        await this.taskRepository.save(q);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => entity_1.Task),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.TaskArgs, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "newTask", null);
__decorate([
    (0, type_graphql_1.Query)(() => [entity_1.Task]),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTasks", null);
__decorate([
    (0, type_graphql_1.Query)(() => entity_1.Task),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTaskById", null);
__decorate([
    (0, type_graphql_1.Query)(() => [entity_1.Task]),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("date", () => Date)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTasksByDate", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "deleteTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UpdateTaskArgs, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateTask", null);
TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TaskResolver);
exports.TaskResolver = TaskResolver;
//# sourceMappingURL=task.resolver.js.map