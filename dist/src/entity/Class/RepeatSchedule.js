var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { DayOfWeek } from "../types";
import { ClassSchedule } from "..";
import { Field, Int, ObjectType } from "type-graphql";
let RepeatSchedule = class RepeatSchedule {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    Field(() => String),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "id", void 0);
__decorate([
    Column("time"),
    Field(() => String),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "startTime", void 0);
__decorate([
    Column("time"),
    Field(() => String),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "endTime", void 0);
__decorate([
    Column("int", { array: true }),
    Field(() => [DayOfWeek]),
    __metadata("design:type", Array)
], RepeatSchedule.prototype, "repeatDays", void 0);
__decorate([
    Column("date", { nullable: true }),
    Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "startDate", void 0);
__decorate([
    Column("date", { nullable: true }),
    Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "endDate", void 0);
__decorate([
    Column("int", { nullable: true }),
    Field(() => Int, { nullable: true }),
    __metadata("design:type", Number)
], RepeatSchedule.prototype, "rotationWeek", void 0);
__decorate([
    Column("uuid"),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "scheduleId", void 0);
__decorate([
    ManyToOne(() => ClassSchedule, (schedule) => schedule.repeat, {
        onDelete: "CASCADE",
    }),
    JoinColumn({ name: "scheduleId", referencedColumnName: "id" }),
    __metadata("design:type", ClassSchedule)
], RepeatSchedule.prototype, "schedule", void 0);
RepeatSchedule = __decorate([
    Entity("class_repeat_schedule"),
    ObjectType()
], RepeatSchedule);
export { RepeatSchedule };
//# sourceMappingURL=RepeatSchedule.js.map