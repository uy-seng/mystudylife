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
import { Args, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { OneOffSchedule } from "../../../entity";
import { OneOffScheduleArgs } from "./types";
import { getConnection } from "typeorm";
import { authenticationGate } from "../../../middleware";
import { ValidationError } from "apollo-server-express";
import { UpdateOneOffScheduleArgs } from "./types/oneOffSchedule";
let OneOffScheduleResolver = class OneOffScheduleResolver {
    constructor() {
        this.oneOffScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(OneOffSchedule);
    }
    async newOneOffSchedule({ startTime, endTime, date, scheduleId }) {
        const oneOffSchedule = this.oneOffScheduleRepository.create({
            startTime: startTime,
            endTime: endTime,
            date: date,
            scheduleId: scheduleId,
        });
        return await this.oneOffScheduleRepository.save(oneOffSchedule);
    }
    async updateOneOffSchedule(updateContext, { user }) {
        const q = await this.oneOffScheduleRepository.findOne(updateContext.id, {
            relations: ["schedule", "schedule.class", "schedule.class.user"],
        });
        if ((q === null || q === void 0 ? void 0 : q.schedule.class.user.id) !== user.id || !q)
            throw new ValidationError("items not found, please provide a valid id");
        q.date = updateContext.date;
        q.endTime = updateContext.endTime;
        q.startTime = updateContext.startTime;
        await this.oneOffScheduleRepository.save(q);
        return true;
    }
};
__decorate([
    Mutation(() => OneOffSchedule),
    UseMiddleware(authenticationGate),
    __param(0, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OneOffScheduleArgs]),
    __metadata("design:returntype", Promise)
], OneOffScheduleResolver.prototype, "newOneOffSchedule", null);
__decorate([
    Mutation(() => Boolean),
    UseMiddleware(authenticationGate),
    __param(0, Args()),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateOneOffScheduleArgs, Object]),
    __metadata("design:returntype", Promise)
], OneOffScheduleResolver.prototype, "updateOneOffSchedule", null);
OneOffScheduleResolver = __decorate([
    Resolver()
], OneOffScheduleResolver);
export { OneOffScheduleResolver };
//# sourceMappingURL=oneOffSchedule.resolver.js.map