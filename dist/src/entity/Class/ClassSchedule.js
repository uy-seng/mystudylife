var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { RepeatSchedule, OneOffSchedule, Class } from "..";
import { Field, ObjectType } from "type-graphql";
import { ClassScheduleType } from "../types";
let ClassSchedule = class ClassSchedule {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    Field(() => String),
    __metadata("design:type", String)
], ClassSchedule.prototype, "id", void 0);
__decorate([
    Column("text"),
    Field(() => ClassScheduleType),
    __metadata("design:type", String)
], ClassSchedule.prototype, "type", void 0);
__decorate([
    OneToOne(() => OneOffSchedule, (oneoff) => oneoff.schedule),
    Field(() => OneOffSchedule, { nullable: true }),
    __metadata("design:type", OneOffSchedule)
], ClassSchedule.prototype, "oneOff", void 0);
__decorate([
    OneToMany(() => RepeatSchedule, (repeat) => repeat.schedule),
    Field(() => [RepeatSchedule], { nullable: true }),
    __metadata("design:type", Array)
], ClassSchedule.prototype, "repeat", void 0);
__decorate([
    Column("uuid"),
    __metadata("design:type", String)
], ClassSchedule.prototype, "classId", void 0);
__decorate([
    OneToOne(() => Class, { onDelete: "CASCADE" }),
    JoinColumn({ name: "classId", referencedColumnName: "id" }),
    __metadata("design:type", Class)
], ClassSchedule.prototype, "class", void 0);
ClassSchedule = __decorate([
    Entity("class_schedules"),
    ObjectType()
], ClassSchedule);
export { ClassSchedule };
//# sourceMappingURL=ClassSchedule.js.map