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
exports.DayRotationSchedule = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const __1 = require("..");
let DayRotationSchedule = class DayRotationSchedule {
    id;
    numOfDay;
    startDay;
    repeatDays;
    scheduleId;
    schedule;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DayRotationSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], DayRotationSchedule.prototype, "numOfDay", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], DayRotationSchedule.prototype, "startDay", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { array: true }),
    (0, type_graphql_1.Field)(() => [type_graphql_1.Int]),
    __metadata("design:type", Array)
], DayRotationSchedule.prototype, "repeatDays", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], DayRotationSchedule.prototype, "scheduleId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.AcademicYearSchedule, (schedule) => schedule.dayRotation, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "scheduleId" }),
    __metadata("design:type", __1.AcademicYearSchedule)
], DayRotationSchedule.prototype, "schedule", void 0);
DayRotationSchedule = __decorate([
    (0, typeorm_1.Entity)("academic_year_day_rotation_schedules"),
    (0, type_graphql_1.ObjectType)()
], DayRotationSchedule);
exports.DayRotationSchedule = DayRotationSchedule;
//# sourceMappingURL=DayRotationSchedule.js.map