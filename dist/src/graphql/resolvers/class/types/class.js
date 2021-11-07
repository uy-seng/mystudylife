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
exports.UpdateClassArgs = exports.ClassArgs = void 0;
const type_graphql_1 = require("type-graphql");
let ClassArgs = class ClassArgs {
    subjectId;
    module;
    room;
    building;
    teacher;
    academicYearId;
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ClassArgs.prototype, "subjectId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { defaultValue: "" }),
    __metadata("design:type", String)
], ClassArgs.prototype, "module", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { defaultValue: "" }),
    __metadata("design:type", String)
], ClassArgs.prototype, "room", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { defaultValue: "" }),
    __metadata("design:type", String)
], ClassArgs.prototype, "building", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { defaultValue: "" }),
    __metadata("design:type", String)
], ClassArgs.prototype, "teacher", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ClassArgs.prototype, "academicYearId", void 0);
ClassArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], ClassArgs);
exports.ClassArgs = ClassArgs;
let UpdateClassArgs = class UpdateClassArgs extends ClassArgs {
    id;
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdateClassArgs.prototype, "id", void 0);
UpdateClassArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], UpdateClassArgs);
exports.UpdateClassArgs = UpdateClassArgs;
//# sourceMappingURL=class.js.map