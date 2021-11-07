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
exports.RepeatScheduleArgs = void 0;
const types_1 = require("../../../../entity/types");
const type_graphql_1 = require("type-graphql");
(0, type_graphql_1.registerEnumType)(types_1.DayOfWeek, {
    name: "DayOfWeek",
});
let RepeatScheduleArgs = class RepeatScheduleArgs {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RepeatScheduleArgs.prototype, "startTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RepeatScheduleArgs.prototype, "endTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [types_1.DayOfWeek]),
    __metadata("design:type", Array)
], RepeatScheduleArgs.prototype, "repeatDays", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RepeatScheduleArgs.prototype, "scheduleId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RepeatScheduleArgs.prototype, "startDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RepeatScheduleArgs.prototype, "endDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], RepeatScheduleArgs.prototype, "rotationWeek", void 0);
RepeatScheduleArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], RepeatScheduleArgs);
exports.RepeatScheduleArgs = RepeatScheduleArgs;
//# sourceMappingURL=repeatSchedule.js.map