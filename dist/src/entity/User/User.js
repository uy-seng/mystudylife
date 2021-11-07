var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, } from "typeorm";
import { Task, Exam, Subject, Class, AcademicYear, UserProvider } from "..";
var User = (function () {
    function User() {
    }
    __decorate([
        PrimaryGeneratedColumn("uuid"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        Column({ unique: true }),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        Column({ unique: true, nullable: true }),
        Field(function () { return String; }, { nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        Column({ nullable: true }),
        Field(function () { return String; }, { nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        OneToOne(function () { return UserProvider; }),
        JoinColumn(),
        Field(function () { return UserProvider; }),
        __metadata("design:type", UserProvider)
    ], User.prototype, "provider", void 0);
    __decorate([
        Column({ default: 0 }),
        Field(function () { return Int; }),
        __metadata("design:type", Number)
    ], User.prototype, "tokenVersion", void 0);
    __decorate([
        OneToMany(function () { return Task; }, function (task) { return task.user; }, { onDelete: "CASCADE" }),
        __metadata("design:type", Array)
    ], User.prototype, "tasks", void 0);
    __decorate([
        OneToMany(function () { return Exam; }, function (exam) { return exam.user; }, { onDelete: "CASCADE" }),
        __metadata("design:type", Array)
    ], User.prototype, "exams", void 0);
    __decorate([
        OneToMany(function () { return Subject; }, function (subject) { return subject.user; }, { onDelete: "CASCADE" }),
        __metadata("design:type", Array)
    ], User.prototype, "subjects", void 0);
    __decorate([
        OneToMany(function () { return Class; }, function (_class) { return _class.user; }, { onDelete: "CASCADE" }),
        __metadata("design:type", Array)
    ], User.prototype, "classes", void 0);
    __decorate([
        OneToMany(function () { return AcademicYear; }, function (academicYear) { return academicYear.user; }, {
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], User.prototype, "academicYears", void 0);
    User = __decorate([
        Entity("users"),
        ObjectType()
    ], User);
    return User;
}());
export { User };
//# sourceMappingURL=User.js.map