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
exports.OneOffSchedule = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const __1 = require("..");
let OneOffSchedule = class OneOffSchedule {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], OneOffSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], OneOffSchedule.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], OneOffSchedule.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], OneOffSchedule.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], OneOffSchedule.prototype, "scheduleId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.ClassSchedule, (schedule) => schedule.oneOff, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "scheduleId", referencedColumnName: "id" }),
    __metadata("design:type", __1.ClassSchedule)
], OneOffSchedule.prototype, "schedule", void 0);
OneOffSchedule = __decorate([
    (0, typeorm_1.Entity)("class_one_off_schedule"),
    (0, type_graphql_1.ObjectType)()
], OneOffSchedule);
exports.OneOffSchedule = OneOffSchedule;
//# sourceMappingURL=OneOffSchedule.js.map