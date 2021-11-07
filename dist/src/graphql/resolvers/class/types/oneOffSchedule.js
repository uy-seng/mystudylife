var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ArgsType, Field } from "type-graphql";
let OneOffScheduleArgs = class OneOffScheduleArgs {
};
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], OneOffScheduleArgs.prototype, "date", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], OneOffScheduleArgs.prototype, "startTime", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], OneOffScheduleArgs.prototype, "endTime", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], OneOffScheduleArgs.prototype, "scheduleId", void 0);
OneOffScheduleArgs = __decorate([
    ArgsType()
], OneOffScheduleArgs);
export { OneOffScheduleArgs };
let UpdateOneOffScheduleArgs = class UpdateOneOffScheduleArgs extends OneOffScheduleArgs {
};
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], UpdateOneOffScheduleArgs.prototype, "id", void 0);
UpdateOneOffScheduleArgs = __decorate([
    ArgsType()
], UpdateOneOffScheduleArgs);
export { UpdateOneOffScheduleArgs };
//# sourceMappingURL=oneOffSchedule.js.map