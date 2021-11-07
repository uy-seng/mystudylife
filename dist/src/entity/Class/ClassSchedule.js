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
exports.ClassSchedule = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
const type_graphql_1 = require("type-graphql");
const types_1 = require("../types");
let ClassSchedule = class ClassSchedule {
    id;
    type;
    oneOff;
    repeat;
    classId;
    class;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ClassSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    (0, type_graphql_1.Field)(() => types_1.ClassScheduleType),
    __metadata("design:type", String)
], ClassSchedule.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.OneOffSchedule, (oneoff) => oneoff.schedule),
    (0, type_graphql_1.Field)(() => __1.OneOffSchedule, { nullable: true }),
    __metadata("design:type", __1.OneOffSchedule)
], ClassSchedule.prototype, "oneOff", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.RepeatSchedule, (repeat) => repeat.schedule),
    (0, type_graphql_1.Field)(() => [__1.RepeatSchedule], { nullable: true }),
    __metadata("design:type", Array)
], ClassSchedule.prototype, "repeat", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], ClassSchedule.prototype, "classId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.Class, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "classId", referencedColumnName: "id" }),
    __metadata("design:type", __1.Class)
], ClassSchedule.prototype, "class", void 0);
ClassSchedule = __decorate([
    (0, typeorm_1.Entity)("class_schedules"),
    (0, type_graphql_1.ObjectType)()
], ClassSchedule);
exports.ClassSchedule = ClassSchedule;
//# sourceMappingURL=ClassSchedule.js.map