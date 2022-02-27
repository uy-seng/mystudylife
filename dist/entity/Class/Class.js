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
exports.Class = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const __1 = require("..");
let Class = class Class {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Class.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Class.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Class.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Class.prototype, "building", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Class.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.Subject, (subject) => subject.classes),
    (0, type_graphql_1.Field)(() => __1.Subject),
    __metadata("design:type", __1.Subject)
], Class.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => __1.ClassSchedule, (classSchedule) => classSchedule.class),
    (0, type_graphql_1.Field)(() => __1.ClassSchedule),
    __metadata("design:type", __1.ClassSchedule)
], Class.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.AcademicYear, (academicYear) => academicYear.classes),
    (0, type_graphql_1.Field)(() => __1.AcademicYear, { nullable: true }),
    __metadata("design:type", __1.AcademicYear)
], Class.prototype, "academicYear", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.Term, (term) => term.classes),
    (0, type_graphql_1.Field)(() => __1.Term, { nullable: true }),
    __metadata("design:type", __1.Term)
], Class.prototype, "term", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.User, (user) => user.classes),
    (0, type_graphql_1.Field)(() => __1.User),
    __metadata("design:type", __1.User)
], Class.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => "NOW()" }),
    __metadata("design:type", Date)
], Class.prototype, "createdAt", void 0);
Class = __decorate([
    (0, typeorm_1.Entity)("classes", {
        orderBy: {
            createdAt: "ASC"
        }
    }),
    (0, type_graphql_1.ObjectType)()
], Class);
exports.Class = Class;
//# sourceMappingURL=Class.js.map