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
exports.RepeatSchedule = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const __1 = require("..");
const type_graphql_1 = require("type-graphql");
let RepeatSchedule = class RepeatSchedule {
    id;
    startTime;
    endTime;
    repeatDays;
    startDate;
    endDate;
    rotationWeek;
    scheduleId;
    schedule;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { array: true }),
    (0, type_graphql_1.Field)(() => [types_1.DayOfWeek]),
    __metadata("design:type", Array)
], RepeatSchedule.prototype, "repeatDays", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { nullable: true }),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { nullable: true }),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true }),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], RepeatSchedule.prototype, "rotationWeek", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], RepeatSchedule.prototype, "scheduleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.ClassSchedule, (schedule) => schedule.repeat, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "scheduleId", referencedColumnName: "id" }),
    __metadata("design:type", __1.ClassSchedule)
], RepeatSchedule.prototype, "schedule", void 0);
RepeatSchedule = __decorate([
    (0, typeorm_1.Entity)("class_repeat_schedule"),
    (0, type_graphql_1.ObjectType)()
], RepeatSchedule);
exports.RepeatSchedule = RepeatSchedule;
//# sourceMappingURL=RepeatSchedule.js.map