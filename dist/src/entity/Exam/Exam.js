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
exports.Exam = void 0;
const __1 = require("..");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
let Exam = class Exam {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Exam.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Exam.prototype, "resit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Exam.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Exam.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Exam.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Exam.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Exam.prototype, "seat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Exam.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.Subject),
    (0, typeorm_1.JoinColumn)(),
    (0, type_graphql_1.Field)(() => __1.Subject),
    __metadata("design:type", __1.Subject)
], Exam.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Task, (task) => task.exam),
    __metadata("design:type", Array)
], Exam.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.User, (user) => user.exams),
    __metadata("design:type", __1.User)
], Exam.prototype, "user", void 0);
Exam = __decorate([
    (0, typeorm_1.Entity)("exams"),
    (0, type_graphql_1.ObjectType)()
], Exam);
exports.Exam = Exam;
//# sourceMappingURL=Exam.js.map