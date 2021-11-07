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
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { AcademicYear, DayRotationSchedule, WeekRotationSchedule } from "..";
import { AcademicYearScheduleType } from "../types";
let AcademicYearSchedule = class AcademicYearSchedule {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    Field(() => String),
    __metadata("design:type", String)
], AcademicYearSchedule.prototype, "id", void 0);
__decorate([
    Column("text"),
    Field(() => AcademicYearScheduleType),
    __metadata("design:type", String)
], AcademicYearSchedule.prototype, "type", void 0);
__decorate([
    OneToOne(() => DayRotationSchedule, (dayRotationSchedule) => dayRotationSchedule.schedule),
    Field(() => DayRotationSchedule, { nullable: true }),
    __metadata("design:type", DayRotationSchedule)
], AcademicYearSchedule.prototype, "dayRotation", void 0);
__decorate([
    OneToOne(() => WeekRotationSchedule, (weekRotationSchedule) => weekRotationSchedule.schedule),
    Field(() => WeekRotationSchedule, { nullable: true }),
    __metadata("design:type", WeekRotationSchedule)
], AcademicYearSchedule.prototype, "weekRotation", void 0);
__decorate([
    Column("uuid"),
    __metadata("design:type", String)
], AcademicYearSchedule.prototype, "academicYearId", void 0);
__decorate([
    OneToOne(() => AcademicYear, (academicYear) => academicYear.schedule, {
        onDelete: "CASCADE",
    }),
    JoinColumn({ name: "academicYearId", referencedColumnName: "id" }),
    __metadata("design:type", AcademicYear)
], AcademicYearSchedule.prototype, "academicYear", void 0);
AcademicYearSchedule = __decorate([
    ObjectType(),
    Entity("academic_year_schedules")
], AcademicYearSchedule);
export { AcademicYearSchedule };
//# sourceMappingURL=AcademicYearSchedule.js.map