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
import { Args, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { ClassSchedule } from "../../../entity";
import { ClassScheduleArgs } from "./types";
import { getConnection } from "typeorm";
import { authenticationGate } from "../../../middleware";
let ClassScheduleResolver = class ClassScheduleResolver {
    constructor() {
        this.classScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(ClassSchedule);
    }
    async newClassSchedule({ type, classId }) {
        const newClassSchedule = this.classScheduleRepository.create({
            classId: classId,
            type: type,
        });
        return await this.classScheduleRepository.save(newClassSchedule);
    }
};
__decorate([
    Mutation(() => ClassSchedule),
    UseMiddleware(authenticationGate),
    __param(0, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClassScheduleArgs]),
    __metadata("design:returntype", Promise)
], ClassScheduleResolver.prototype, "newClassSchedule", null);
ClassScheduleResolver = __decorate([
    Resolver()
], ClassScheduleResolver);
export { ClassScheduleResolver };
//# sourceMappingURL=classSchedule.resolver.js.map