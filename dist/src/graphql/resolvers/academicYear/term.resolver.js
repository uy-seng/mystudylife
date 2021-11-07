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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermResolver = void 0;
const entity_1 = require("src/entity");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const types_1 = require("./types");
let TermResolver = class TermResolver {
    constructor() {
        this.termRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.Term);
    }
    async newTerm({ academicYearId, name, startDate, endDate }) {
        const newTerm = this.termRepository.create({
            academicYearId: academicYearId,
            name: name,
            startDate: startDate,
            endDate: endDate,
        });
        return await this.termRepository.save(newTerm);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => entity_1.Term),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.TermArgs]),
    __metadata("design:returntype", Promise)
], TermResolver.prototype, "newTerm", null);
TermResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TermResolver);
exports.TermResolver = TermResolver;
//# sourceMappingURL=term.resolver.js.map