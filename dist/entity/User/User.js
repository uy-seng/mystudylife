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
exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const __1 = require("..");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.UserProvider),
    (0, typeorm_1.JoinColumn)(),
    (0, type_graphql_1.Field)(() => __1.UserProvider),
    __metadata("design:type", __1.UserProvider)
], User.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], User.prototype, "tokenVersion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Task, (task) => task.user, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], User.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Exam, (exam) => exam.user, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], User.prototype, "exams", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Subject, (subject) => subject.user, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], User.prototype, "subjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Class, (_class) => _class.user, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], User.prototype, "classes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.AcademicYear, (academicYear) => academicYear.user, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "academicYears", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("users"),
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map