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
exports.AcademicYearSchedule = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const __1 = require("..");
const types_1 = require("../types");
let AcademicYearSchedule = class AcademicYearSchedule {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AcademicYearSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    (0, type_graphql_1.Field)(() => types_1.AcademicYearScheduleType),
    __metadata("design:type", String)
], AcademicYearSchedule.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.DayRotationSchedule, (dayRotationSchedule) => dayRotationSchedule.schedule),
    (0, type_graphql_1.Field)(() => __1.DayRotationSchedule, { nullable: true }),
    __metadata("design:type", __1.DayRotationSchedule)
], AcademicYearSchedule.prototype, "dayRotation", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.WeekRotationSchedule, (weekRotationSchedule) => weekRotationSchedule.schedule),
    (0, type_graphql_1.Field)(() => __1.WeekRotationSchedule, { nullable: true }),
    __metadata("design:type", __1.WeekRotationSchedule)
], AcademicYearSchedule.prototype, "weekRotation", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], AcademicYearSchedule.prototype, "academicYearId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.AcademicYear, (academicYear) => academicYear.schedule, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "academicYearId", referencedColumnName: "id" }),
    __metadata("design:type", __1.AcademicYear)
], AcademicYearSchedule.prototype, "academicYear", void 0);
AcademicYearSchedule = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)("academic_year_schedules")
], AcademicYearSchedule);
exports.AcademicYearSchedule = AcademicYearSchedule;
//# sourceMappingURL=AcademicYearSchedule.js.map