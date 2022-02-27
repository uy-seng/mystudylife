"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var __1 = require("..");
var entity_1 = require("src/entity");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("uuid"),
        type_graphql_1.Field(function () { return String; })
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({ unique: true }),
        type_graphql_1.Field(function () { return String; })
    ], User.prototype, "username");
    __decorate([
        typeorm_1.Column({ unique: true, nullable: true }),
        type_graphql_1.Field(function () { return String; }, { nullable: true })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({ nullable: true }),
        type_graphql_1.Field(function () { return String; }, { nullable: true })
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], User.prototype, "userProviderId");
    __decorate([
        typeorm_1.OneToOne(function () { return __1.UserProvider; }),
        typeorm_1.JoinColumn({ name: "userProviderId", referencedColumnName: "id" }),
        type_graphql_1.Field(function () { return __1.UserProvider; })
    ], User.prototype, "provider");
    __decorate([
        typeorm_1.Column({ "default": 0 }),
        type_graphql_1.Field(function () { return type_graphql_1.Int; })
    ], User.prototype, "tokenVersion");
    __decorate([
        typeorm_1.OneToMany(function () { return __1.Task; }, function (task) { return task.user; }, { onDelete: "CASCADE" })
    ], User.prototype, "tasks");
    __decorate([
        typeorm_1.OneToMany(function () { return __1.Exam; }, function (exam) { return exam.user; }, { onDelete: "CASCADE" })
    ], User.prototype, "exams");
    __decorate([
        typeorm_1.OneToMany(function () { return __1.Subject; }, function (subject) { return subject.user; }, { onDelete: "CASCADE" })
    ], User.prototype, "subjects");
    __decorate([
        typeorm_1.OneToMany(function () { return __1.Class; }, function (_class) { return _class.user; }, { onDelete: "CASCADE" })
    ], User.prototype, "classes");
    __decorate([
        typeorm_1.OneToMany(function () { return __1.AcademicYear; }, function (academicYear) { return academicYear.user; }, {
            onDelete: "CASCADE"
        })
    ], User.prototype, "academicYears");
    __decorate([
        typeorm_1.OneToMany(function () { return entity_1.Holiday; }, function (holiday) { return holiday.user; }, { onDelete: "CASCADE" })
    ], User.prototype, "holidays");
    User = __decorate([
        typeorm_1.Entity("users"),
        type_graphql_1.ObjectType()
    ], User);
    return User;
}());
exports.User = User;
