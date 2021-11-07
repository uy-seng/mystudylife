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
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Task, Subject, Class, AcademicYear } from "..";
var Term = (function () {
    function Term() {
    }
    __decorate([
        PrimaryGeneratedColumn("uuid"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Term.prototype, "id", void 0);
    __decorate([
        Column(),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Term.prototype, "name", void 0);
    __decorate([
        Column("date"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Term.prototype, "startDate", void 0);
    __decorate([
        Column("date"),
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], Term.prototype, "endDate", void 0);
    __decorate([
        OneToMany(function () { return Task; }, function (task) { return task.term; }),
        __metadata("design:type", Array)
    ], Term.prototype, "tasks", void 0);
    __decorate([
        OneToMany(function () { return Subject; }, function (subject) { return subject.term; }),
        __metadata("design:type", Array)
    ], Term.prototype, "subjects", void 0);
    __decorate([
        OneToMany(function () { return Class; }, function (_class) { return _class.term; }),
        __metadata("design:type", Array)
    ], Term.prototype, "classes", void 0);
    __decorate([
        Column("uuid"),
        __metadata("design:type", String)
    ], Term.prototype, "academicYearId", void 0);
    __decorate([
        ManyToOne(function () { return AcademicYear; }, function (academicYear) { return academicYear.terms; }, {
            onDelete: "CASCADE",
        }),
        JoinColumn({ name: "academicYearId", referencedColumnName: "id" }),
        __metadata("design:type", AcademicYear)
    ], Term.prototype, "academicYear", void 0);
    Term = __decorate([
        Entity("academic_year_terms"),
        ObjectType()
    ], Term);
    return Term;
}());
export { Term };
//# sourceMappingURL=Term.js.map