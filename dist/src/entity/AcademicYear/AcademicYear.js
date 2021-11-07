var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Task, Subject, Class, User, Term, AcademicYearSchedule } from "..";
var AcademicYear = (function () {
    function AcademicYear() {
    }
    __decorate([
        PrimaryGeneratedColumn("uuid"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], AcademicYear.prototype, "id", void 0);
    __decorate([
        Column("date"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], AcademicYear.prototype, "startDate", void 0);
    __decorate([
        Column("date"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], AcademicYear.prototype, "endDate", void 0);
    __decorate([
        OneToMany(function () { return Term; }, function (term) { return term.academicYear; }),
        Field(function () { return [Term]; }),
        __metadata("design:type", Array)
    ], AcademicYear.prototype, "terms", void 0);
    __decorate([
        OneToOne(function () { return AcademicYearSchedule; }, function (schedule) { return schedule.academicYear; }),
        Field(function () { return AcademicYearSchedule; }),
        __metadata("design:type", AcademicYearSchedule)
    ], AcademicYear.prototype, "schedule", void 0);
    __decorate([
        OneToMany(function () { return Subject; }, function (subject) { return subject.academicYear; }),
        Field(function () { return [Subject]; }),
        __metadata("design:type", Array)
    ], AcademicYear.prototype, "subjects", void 0);
    __decorate([
        OneToMany(function () { return Class; }, function (_class) { return _class.academicYear; }),
        Field(function () { return [Class]; }),
        __metadata("design:type", Array)
    ], AcademicYear.prototype, "classes", void 0);
    __decorate([
        ManyToOne(function () { return Task; }, function (task) { return task.academicYear; }),
        __metadata("design:type", Array)
    ], AcademicYear.prototype, "tasks", void 0);
    __decorate([
        ManyToOne(function () { return User; }, function (user) { return user.academicYears; }),
        __metadata("design:type", User)
    ], AcademicYear.prototype, "user", void 0);
    AcademicYear = __decorate([
        Entity("academic_years"),
        ObjectType()
    ], AcademicYear);
    return AcademicYear;
}());
export { AcademicYear };
//# sourceMappingURL=AcademicYear.js.map