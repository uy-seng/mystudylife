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
let AcademicYear = class AcademicYear {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    Field(() => String),
    __metadata("design:type", String)
], AcademicYear.prototype, "id", void 0);
__decorate([
    Column("date"),
    Field(() => String),
    __metadata("design:type", String)
], AcademicYear.prototype, "startDate", void 0);
__decorate([
    Column("date"),
    Field(() => String),
    __metadata("design:type", String)
], AcademicYear.prototype, "endDate", void 0);
__decorate([
    OneToMany(() => Term, (term) => term.academicYear),
    Field(() => [Term]),
    __metadata("design:type", Array)
], AcademicYear.prototype, "terms", void 0);
__decorate([
    OneToOne(() => AcademicYearSchedule, (schedule) => schedule.academicYear),
    Field(() => AcademicYearSchedule),
    __metadata("design:type", AcademicYearSchedule)
], AcademicYear.prototype, "schedule", void 0);
__decorate([
    OneToMany(() => Subject, (subject) => subject.academicYear),
    Field(() => [Subject]),
    __metadata("design:type", Array)
], AcademicYear.prototype, "subjects", void 0);
__decorate([
    OneToMany(() => Class, (_class) => _class.academicYear),
    Field(() => [Class]),
    __metadata("design:type", Array)
], AcademicYear.prototype, "classes", void 0);
__decorate([
    ManyToOne(() => Task, (task) => task.academicYear),
    __metadata("design:type", Array)
], AcademicYear.prototype, "tasks", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.academicYears),
    __metadata("design:type", User)
], AcademicYear.prototype, "user", void 0);
AcademicYear = __decorate([
    Entity("academic_years"),
    ObjectType()
], AcademicYear);
export { AcademicYear };
//# sourceMappingURL=AcademicYear.js.map