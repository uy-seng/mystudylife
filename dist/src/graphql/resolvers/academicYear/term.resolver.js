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
import { Term } from "../../../entity";
import { Args, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { TermArgs } from "./types";
let TermResolver = class TermResolver {
    constructor() {
        this.termRepository = getConnection(process.env.NODE_ENV).getRepository(Term);
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
    Mutation(() => Term),
    __param(0, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TermArgs]),
    __metadata("design:returntype", Promise)
], TermResolver.prototype, "newTerm", null);
TermResolver = __decorate([
    Resolver()
], TermResolver);
export { TermResolver };
//# sourceMappingURL=term.resolver.js.map