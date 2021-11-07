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
import { Arg, Args, Ctx, Mutation, Resolver, UseMiddleware, } from "type-graphql";
import { RepeatSchedule } from "../../../entity";
import { RepeatScheduleArgs } from "./types";
import { getConnection } from "typeorm";
import { authenticationGate } from "../../../middleware";
import { ValidationError } from "apollo-server-express";
let RepeatScheduleResolver = class RepeatScheduleResolver {
    constructor() {
        this.repeatScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(RepeatSchedule);
    }
    async newRepeatSchedule({ startTime, endTime, repeatDays, scheduleId, startDate, endDate, rotationWeek, }) {
        const repeatSchedule = this.repeatScheduleRepository.create({
            startTime: startTime,
            endTime: endTime,
            repeatDays: repeatDays,
            scheduleId: scheduleId,
            startDate: startDate,
            endDate: endDate,
            rotationWeek: rotationWeek,
        });
        return await this.repeatScheduleRepository.save(repeatSchedule);
    }
    async updateRepeatSchedule(id, updateContext, { user }) {
        const q = await this.repeatScheduleRepository.findOne(id, {
            relations: ["schedule", "schedule.class", "schedule.class.user"],
        });
        if ((q === null || q === void 0 ? void 0 : q.schedule.class.user.id) !== user.id || !q)
            throw new ValidationError("items not found, please provide a valid id");
        q.startDate = updateContext.startDate;
        q.startTime = updateContext.startTime;
        q.endDate = updateContext.endDate;
        q.endTime = updateContext.endTime;
        q.rotationWeek = updateContext.rotationWeek;
        q.repeatDays = updateContext.repeatDays;
        await this.repeatScheduleRepository.save(q);
        return true;
    }
    async deleteRepeatSchedule(id, { user }) {
        const q = await this.repeatScheduleRepository.findOne(id, {
            relations: ["schedule", "schedule.class", "schedule.class.user"],
            where: {
                schedule: {
                    class: {
                        user: {
                            id: user.id,
                        },
                    },
                },
            },
        });
        if (!q)
            throw new ValidationError("item not found, please provide a valid id");
        this.repeatScheduleRepository.remove(q);
        return true;
    }
};
__decorate([
    Mutation(() => RepeatSchedule),
    UseMiddleware(authenticationGate),
    __param(0, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RepeatScheduleArgs]),
    __metadata("design:returntype", Promise)
], RepeatScheduleResolver.prototype, "newRepeatSchedule", null);
__decorate([
    Mutation(() => Boolean),
    UseMiddleware(authenticationGate),
    __param(0, Arg("id", () => String)),
    __param(1, Args()),
    __param(2, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, RepeatScheduleArgs, Object]),
    __metadata("design:returntype", Promise)
], RepeatScheduleResolver.prototype, "updateRepeatSchedule", null);
__decorate([
    Mutation(() => Boolean),
    UseMiddleware(authenticationGate),
    __param(0, Arg("id", () => String)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RepeatScheduleResolver.prototype, "deleteRepeatSchedule", null);
RepeatScheduleResolver = __decorate([
    Resolver()
], RepeatScheduleResolver);
export { RepeatScheduleResolver };
//# sourceMappingURL=repeatSchedule.resolver.js.map