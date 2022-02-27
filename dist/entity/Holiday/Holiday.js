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
exports.Holiday = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const __1 = require("..");
let Holiday = class Holiday {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Holiday.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Holiday.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Holiday.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Holiday.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.AcademicYear, (academicYear) => academicYear.holidays),
    __metadata("design:type", __1.AcademicYear)
], Holiday.prototype, "academicYear", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.User, (user) => user.holidays),
    __metadata("design:type", __1.User)
], Holiday.prototype, "user", void 0);
Holiday = __decorate([
    (0, typeorm_1.Entity)("holidays"),
    (0, type_graphql_1.ObjectType)()
], Holiday);
exports.Holiday = Holiday;
//# sourceMappingURL=Holiday.js.map