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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamInputType = exports.ExamObjectType = void 0;
const entity_1 = require("src/entity");
const type_graphql_1 = require("type-graphql");
const types_1 = require("../../task/types");
const types_2 = require("../../user/types");
let ExamObjectType = class ExamObjectType {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamObjectType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ExamObjectType.prototype, "resit", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamObjectType.prototype, "module", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamObjectType.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamObjectType.prototype, "startTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamObjectType.prototype, "endTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamObjectType.prototype, "seat", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamObjectType.prototype, "room", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [types_1.TaskObjectType]),
    __metadata("design:type", Array)
], ExamObjectType.prototype, "tasks", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => types_2.UserObjectType),
    __metadata("design:type", typeof (_a = typeof types_2.UserObjectType !== "undefined" && types_2.UserObjectType) === "function" ? _a : Object)
], ExamObjectType.prototype, "user", void 0);
ExamObjectType = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExamObjectType);
exports.ExamObjectType = ExamObjectType;
let ExamInputType = class ExamInputType {
};
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ExamInputType.prototype, "resit", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamInputType.prototype, "module", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamInputType.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamInputType.prototype, "startTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamInputType.prototype, "endTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamInputType.prototype, "seat", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamInputType.prototype, "room", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [entity_1.Task]),
    __metadata("design:type", Array)
], ExamInputType.prototype, "tasks", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => entity_1.User),
    __metadata("design:type", entity_1.User)
], ExamInputType.prototype, "user", void 0);
ExamInputType = __decorate([
    (0, type_graphql_1.InputType)()
], ExamInputType);
exports.ExamInputType = ExamInputType;
//# sourceMappingURL=exam.js.map