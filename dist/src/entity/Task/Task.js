var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Subject, Exam, AcademicYear, Term, User } from "..";
import { TaskType } from "../types";
import { Field, ObjectType } from "type-graphql";
var Task = (function () {
    function Task() {
    }
    __decorate([
        PrimaryGeneratedColumn("uuid"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Task.prototype, "id", void 0);
    __decorate([
        Column("text"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Task.prototype, "type", void 0);
    __decorate([
        Column("date"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Task.prototype, "due_date", void 0);
    __decorate([
        Column(),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Task.prototype, "title", void 0);
    __decorate([
        Column(),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Task.prototype, "detail", void 0);
    __decorate([
        CreateDateColumn({ default: function () { return "NOW()"; } }),
        __metadata("design:type", Date)
    ], Task.prototype, "createdAt", void 0);
    __decorate([
        ManyToOne(function () { return Subject; }, function (subject) { return subject.tasks; }),
        Field(function () { return Subject; }),
        __metadata("design:type", Subject)
    ], Task.prototype, "subject", void 0);
    __decorate([
        ManyToOne(function () { return AcademicYear; }, function (academicYear) { return academicYear.tasks; }),
        Field(function () { return AcademicYear; }, { nullable: true }),
        __metadata("design:type", AcademicYear)
    ], Task.prototype, "academicYear", void 0);
    __decorate([
        ManyToOne(function () { return Exam; }, function (exam) { return exam.tasks; }),
        __metadata("design:type", Exam)
    ], Task.prototype, "exam", void 0);
    __decorate([
        ManyToOne(function () { return Term; }, function (term) { return term.tasks; }),
        __metadata("design:type", Term)
    ], Task.prototype, "term", void 0);
    __decorate([
        ManyToOne(function () { return User; }, function (user) { return user.tasks; }),
        __metadata("design:type", User)
    ], Task.prototype, "user", void 0);
    Task = __decorate([
        Entity("tasks", {
            orderBy: {
                createdAt: "ASC",
            },
        }),
        ObjectType()
    ], Task);
    return Task;
}());
export { Task };
//# sourceMappingURL=Task.js.map