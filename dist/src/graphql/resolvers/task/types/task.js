var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { TaskType } from "../../../../entity/types";
import { ArgsType, Field, registerEnumType } from "type-graphql";
registerEnumType(TaskType, {
    name: "TaskType",
});
let TaskArgs = class TaskArgs {
};
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], TaskArgs.prototype, "subjectId", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], TaskArgs.prototype, "academicYearId", void 0);
__decorate([
    Field(() => TaskType),
    __metadata("design:type", String)
], TaskArgs.prototype, "type", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], TaskArgs.prototype, "due_date", void 0);
__decorate([
    Field(() => String, { defaultValue: "" }),
    __metadata("design:type", String)
], TaskArgs.prototype, "title", void 0);
__decorate([
    Field(() => String, { defaultValue: "" }),
    __metadata("design:type", String)
], TaskArgs.prototype, "detail", void 0);
TaskArgs = __decorate([
    ArgsType()
], TaskArgs);
export { TaskArgs };
let UpdateTaskArgs = class UpdateTaskArgs extends TaskArgs {
};
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], UpdateTaskArgs.prototype, "id", void 0);
UpdateTaskArgs = __decorate([
    ArgsType()
], UpdateTaskArgs);
export { UpdateTaskArgs };
//# sourceMappingURL=task.js.map