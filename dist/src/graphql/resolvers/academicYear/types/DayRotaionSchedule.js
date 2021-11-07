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
exports.DayRotationScheduleArgs = void 0;
const type_graphql_1 = require("type-graphql");
let DayRotationScheduleArgs = class DayRotationScheduleArgs {
    startDay;
    numOfDay;
    repeatDays;
    scheduleId;
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], DayRotationScheduleArgs.prototype, "startDay", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], DayRotationScheduleArgs.prototype, "numOfDay", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [type_graphql_1.Int]),
    __metadata("design:type", Array)
], DayRotationScheduleArgs.prototype, "repeatDays", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DayRotationScheduleArgs.prototype, "scheduleId", void 0);
DayRotationScheduleArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], DayRotationScheduleArgs);
exports.DayRotationScheduleArgs = DayRotationScheduleArgs;
//# sourceMappingURL=DayRotaionSchedule.js.map