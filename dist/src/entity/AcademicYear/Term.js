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
exports.Term = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const __1 = require("..");
let Term = class Term {
    id;
    name;
    startDate;
    endDate;
    tasks;
    subjects;
    classes;
    academicYearId;
    academicYear;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Term.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Term.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Term.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Term.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Task, (task) => task.term),
    __metadata("design:type", Array)
], Term.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Subject, (subject) => subject.term),
    __metadata("design:type", Array)
], Term.prototype, "subjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Class, (_class) => _class.term),
    __metadata("design:type", Array)
], Term.prototype, "classes", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], Term.prototype, "academicYearId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.AcademicYear, (academicYear) => academicYear.terms, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "academicYearId", referencedColumnName: "id" }),
    __metadata("design:type", __1.AcademicYear)
], Term.prototype, "academicYear", void 0);
Term = __decorate([
    (0, typeorm_1.Entity)("academic_year_terms"),
    (0, type_graphql_1.ObjectType)()
], Term);
exports.Term = Term;
//# sourceMappingURL=Term.js.map