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
exports.AcademicYear = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const __1 = require("..");
let AcademicYear = class AcademicYear {
    id;
    startDate;
    endDate;
    terms;
    schedule;
    subjects;
    classes;
    tasks;
    user;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AcademicYear.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AcademicYear.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AcademicYear.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Term, (term) => term.academicYear),
    (0, type_graphql_1.Field)(() => [__1.Term]),
    __metadata("design:type", Array)
], AcademicYear.prototype, "terms", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.AcademicYearSchedule, (schedule) => schedule.academicYear),
    (0, type_graphql_1.Field)(() => __1.AcademicYearSchedule),
    __metadata("design:type", __1.AcademicYearSchedule)
], AcademicYear.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Subject, (subject) => subject.academicYear),
    (0, type_graphql_1.Field)(() => [__1.Subject]),
    __metadata("design:type", Array)
], AcademicYear.prototype, "subjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Class, (_class) => _class.academicYear),
    (0, type_graphql_1.Field)(() => [__1.Class]),
    __metadata("design:type", Array)
], AcademicYear.prototype, "classes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.Task, (task) => task.academicYear),
    __metadata("design:type", Array)
], AcademicYear.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.User, (user) => user.academicYears),
    __metadata("design:type", __1.User)
], AcademicYear.prototype, "user", void 0);
AcademicYear = __decorate([
    (0, typeorm_1.Entity)("academic_years"),
    (0, type_graphql_1.ObjectType)()
], AcademicYear);
exports.AcademicYear = AcademicYear;
//# sourceMappingURL=AcademicYear.js.map