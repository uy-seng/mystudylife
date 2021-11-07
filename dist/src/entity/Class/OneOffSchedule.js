var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { ClassSchedule } from "..";
var OneOffSchedule = (function () {
    function OneOffSchedule() {
    }
    __decorate([
        PrimaryGeneratedColumn("uuid"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], OneOffSchedule.prototype, "id", void 0);
    __decorate([
        Column("date"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], OneOffSchedule.prototype, "date", void 0);
    __decorate([
        Column("time"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], OneOffSchedule.prototype, "startTime", void 0);
    __decorate([
        Column("time"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], OneOffSchedule.prototype, "endTime", void 0);
    __decorate([
        Column("uuid"),
        __metadata("design:type", String)
    ], OneOffSchedule.prototype, "scheduleId", void 0);
    __decorate([
        OneToOne(function () { return ClassSchedule; }, function (schedule) { return schedule.oneOff; }, {
            onDelete: "CASCADE",
        }),
        JoinColumn({ name: "scheduleId", referencedColumnName: "id" }),
        __metadata("design:type", ClassSchedule)
    ], OneOffSchedule.prototype, "schedule", void 0);
    OneOffSchedule = __decorate([
        Entity("class_one_off_schedule"),
        ObjectType()
    ], OneOffSchedule);
    return OneOffSchedule;
}());
export { OneOffSchedule };
//# sourceMappingURL=OneOffSchedule.js.map