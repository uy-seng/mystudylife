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
exports.UpdateTaskArgs = exports.TaskArgs = void 0;
const types_1 = require("src/entity/types");
const type_graphql_1 = require("type-graphql");
(0, type_graphql_1.registerEnumType)(types_1.TaskType, {
    name: "TaskType",
});
let TaskArgs = class TaskArgs {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TaskArgs.prototype, "subjectId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TaskArgs.prototype, "academicYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => types_1.TaskType),
    __metadata("design:type", String)
], TaskArgs.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TaskArgs.prototype, "due_date", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { defaultValue: "" }),
    __metadata("design:type", String)
], TaskArgs.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { defaultValue: "" }),
    __metadata("design:type", String)
], TaskArgs.prototype, "detail", void 0);
TaskArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], TaskArgs);
exports.TaskArgs = TaskArgs;
let UpdateTaskArgs = class UpdateTaskArgs extends TaskArgs {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdateTaskArgs.prototype, "id", void 0);
UpdateTaskArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], UpdateTaskArgs);
exports.UpdateTaskArgs = UpdateTaskArgs;
//# sourceMappingURL=task.js.map