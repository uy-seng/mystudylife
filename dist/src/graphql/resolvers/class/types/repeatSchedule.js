var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DayOfWeek } from "../../../../entity/types";
import { ArgsType, Field, Int, registerEnumType } from "type-graphql";
registerEnumType(DayOfWeek, {
    name: "DayOfWeek",
});
let RepeatScheduleArgs = class RepeatScheduleArgs {
};
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], RepeatScheduleArgs.prototype, "startTime", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], RepeatScheduleArgs.prototype, "endTime", void 0);
__decorate([
    Field(() => [DayOfWeek]),
    __metadata("design:type", Array)
], RepeatScheduleArgs.prototype, "repeatDays", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], RepeatScheduleArgs.prototype, "scheduleId", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], RepeatScheduleArgs.prototype, "startDate", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], RepeatScheduleArgs.prototype, "endDate", void 0);
__decorate([
    Field(() => Int, { nullable: true }),
    __metadata("design:type", Number)
], RepeatScheduleArgs.prototype, "rotationWeek", void 0);
RepeatScheduleArgs = __decorate([
    ArgsType()
], RepeatScheduleArgs);
export { RepeatScheduleArgs };
//# sourceMappingURL=repeatSchedule.js.map