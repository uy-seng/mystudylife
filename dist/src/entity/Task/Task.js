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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
const types_1 = require("../types");
const type_graphql_1 = require("type-graphql");
let Task = class Task {
    id;
    type;
    due_date;
    title;
    detail;
    createdAt;
    subject;
    academicYear;
    exam;
    term;
    user;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Task.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Task.prototype, "due_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Task.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => "NOW()" }),
    __metadata("design:type", Date)
], Task.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.Subject, (subject) => subject.tasks),
    (0, type_graphql_1.Field)(() => __1.Subject),
    __metadata("design:type", __1.Subject)
], Task.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.AcademicYear, (academicYear) => academicYear.tasks),
    (0, type_graphql_1.Field)(() => __1.AcademicYear, { nullable: true }),
    __metadata("design:type", __1.AcademicYear)
], Task.prototype, "academicYear", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.Exam, (exam) => exam.tasks),
    __metadata("design:type", __1.Exam)
], Task.prototype, "exam", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.Term, (term) => term.tasks),
    __metadata("design:type", __1.Term)
], Task.prototype, "term", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.User, (user) => user.tasks),
    __metadata("design:type", __1.User)
], Task.prototype, "user", void 0);
Task = __decorate([
    (0, typeorm_1.Entity)("tasks", {
        orderBy: {
            createdAt: "ASC",
        },
    }),
    (0, type_graphql_1.ObjectType)()
], Task);
exports.Task = Task;
//# sourceMappingURL=Task.js.map