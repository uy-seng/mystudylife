var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { AcademicYearSchedule } from "..";
var DayRotationSchedule = (function () {
    function DayRotationSchedule() {
    }
    __decorate([
        PrimaryGeneratedColumn("uuid"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], DayRotationSchedule.prototype, "id", void 0);
    __decorate([
        Column(),
        Field(function () { return Int; }),
        __metadata("design:type", Number)
    ], DayRotationSchedule.prototype, "numOfDay", void 0);
    __decorate([
        Column(),
        Field(function () { return Int; }),
        __metadata("design:type", Number)
    ], DayRotationSchedule.prototype, "startDay", void 0);
    __decorate([
        Column("int", { array: true }),
        Field(function () { return [Int]; }),
        __metadata("design:type", Array)
    ], DayRotationSchedule.prototype, "repeatDays", void 0);
    __decorate([
        Column("uuid"),
        __metadata("design:type", String)
    ], DayRotationSchedule.prototype, "scheduleId", void 0);
    __decorate([
        OneToOne(function () { return AcademicYearSchedule; }, function (schedule) { return schedule.dayRotation; }, {
            onDelete: "CASCADE",
        }),
        JoinColumn({ name: "scheduleId" }),
        __metadata("design:type", AcademicYearSchedule)
    ], DayRotationSchedule.prototype, "schedule", void 0);
    DayRotationSchedule = __decorate([
        Entity("academic_year_day_rotation_schedules"),
        ObjectType()
    ], DayRotationSchedule);
    return DayRotationSchedule;
}());
export { DayRotationSchedule };
//# sourceMappingURL=DayRotationSchedule.js.map