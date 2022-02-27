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
exports.Subject = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
const type_graphql_1 = require("type-graphql");
let Subject = class Subject {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Subject.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Subject.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Task, (task) => task.subject),
    __metadata("design:type", Array)
], Subject.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.AcademicYear, (academicYear) => academicYear.subjects),
    (0, type_graphql_1.Field)(() => __1.AcademicYear, { nullable: true }),
    __metadata("design:type", __1.AcademicYear)
], Subject.prototype, "academicYear", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.Term, (term) => term.subjects),
    (0, type_graphql_1.Field)(() => __1.Term, { nullable: true }),
    __metadata("design:type", __1.Term)
], Subject.prototype, "term", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.User, (user) => user.subjects),
    __metadata("design:type", __1.User)
], Subject.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Class, (_class) => _class.subject),
    __metadata("design:type", Array)
], Subject.prototype, "classes", void 0);
Subject = __decorate([
    (0, typeorm_1.Entity)("subjects"),
    (0, type_graphql_1.ObjectType)()
], Subject);
exports.Subject = Subject;
//# sourceMappingURL=Subject.js.map