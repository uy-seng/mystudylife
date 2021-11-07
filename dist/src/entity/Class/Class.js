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
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Subject, AcademicYear, Term, User, ClassSchedule } from "..";
var Class = (function () {
    function Class() {
    }
    __decorate([
        PrimaryGeneratedColumn("uuid"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Class.prototype, "id", void 0);
    __decorate([
        Column(),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Class.prototype, "module", void 0);
    __decorate([
        Column(),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Class.prototype, "room", void 0);
    __decorate([
        Column(),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Class.prototype, "building", void 0);
    __decorate([
        Column(),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Class.prototype, "teacher", void 0);
    __decorate([
        ManyToOne(function () { return Subject; }, function (subject) { return subject.classes; }),
        Field(function () { return Subject; }),
        __metadata("design:type", Subject)
    ], Class.prototype, "subject", void 0);
    __decorate([
        OneToOne(function () { return ClassSchedule; }, function (classSchedule) { return classSchedule.class; }),
        Field(function () { return ClassSchedule; }),
        __metadata("design:type", ClassSchedule)
    ], Class.prototype, "schedule", void 0);
    __decorate([
        ManyToOne(function () { return AcademicYear; }, function (academicYear) { return academicYear.classes; }),
        Field(function () { return AcademicYear; }, { nullable: true }),
        __metadata("design:type", AcademicYear)
    ], Class.prototype, "academicYear", void 0);
    __decorate([
        ManyToOne(function () { return Term; }, function (term) { return term.classes; }),
        __metadata("design:type", Term)
    ], Class.prototype, "term", void 0);
    __decorate([
        ManyToOne(function () { return User; }, function (user) { return user.classes; }),
        Field(function () { return User; }),
        __metadata("design:type", User)
    ], Class.prototype, "user", void 0);
    __decorate([
        CreateDateColumn({ default: function () { return "NOW()"; } }),
        __metadata("design:type", Date)
    ], Class.prototype, "createdAt", void 0);
    Class = __decorate([
        Entity("classes", {
            orderBy: {
                createdAt: "ASC",
            },
        }),
        ObjectType()
    ], Class);
    return Class;
}());
export { Class };
//# sourceMappingURL=Class.js.map