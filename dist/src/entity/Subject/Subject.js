var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Task, AcademicYear, Term, User, Class } from "..";
import { Field, ObjectType } from "type-graphql";
var Subject = (function () {
    function Subject() {
    }
    __decorate([
        PrimaryGeneratedColumn("uuid"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Subject.prototype, "id", void 0);
    __decorate([
        Column(),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Subject.prototype, "name", void 0);
    __decorate([
        OneToMany(function () { return Task; }, function (task) { return task.subject; }),
        __metadata("design:type", Array)
    ], Subject.prototype, "tasks", void 0);
    __decorate([
        ManyToOne(function () { return AcademicYear; }, function (academicYear) { return academicYear.subjects; }),
        Field(function () { return AcademicYear; }, { nullable: true }),
        __metadata("design:type", AcademicYear)
    ], Subject.prototype, "academicYear", void 0);
    __decorate([
        ManyToOne(function () { return Term; }, function (term) { return term.subjects; }),
        __metadata("design:type", Term)
    ], Subject.prototype, "term", void 0);
    __decorate([
        ManyToOne(function () { return User; }, function (user) { return user.subjects; }),
        __metadata("design:type", User)
    ], Subject.prototype, "user", void 0);
    __decorate([
        OneToMany(function () { return Class; }, function (_class) { return _class.subject; }),
        __metadata("design:type", Array)
    ], Subject.prototype, "classes", void 0);
    Subject = __decorate([
        Entity("subjects"),
        ObjectType()
    ], Subject);
    return Subject;
}());
export { Subject };
//# sourceMappingURL=Subject.js.map