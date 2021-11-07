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
exports.WeekRotationSchedule = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const __1 = require("..");
let WeekRotationSchedule = class WeekRotationSchedule {
    id;
    numOfWeek;
    startWeek;
    scheduleId;
    schedule;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], WeekRotationSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], WeekRotationSchedule.prototype, "numOfWeek", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], WeekRotationSchedule.prototype, "startWeek", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], WeekRotationSchedule.prototype, "scheduleId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.AcademicYearSchedule, (schedule) => schedule.weekRotation, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "scheduleId", referencedColumnName: "id" }),
    __metadata("design:type", __1.AcademicYearSchedule)
], WeekRotationSchedule.prototype, "schedule", void 0);
WeekRotationSchedule = __decorate([
    (0, typeorm_1.Entity)("academic_year_week_rotation_schedules"),
    (0, type_graphql_1.ObjectType)()
], WeekRotationSchedule);
exports.WeekRotationSchedule = WeekRotationSchedule;
//# sourceMappingURL=WeekRotationSchedule.js.map