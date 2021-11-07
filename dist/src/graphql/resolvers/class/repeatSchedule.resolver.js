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
exports.RepeatScheduleResolver = void 0;
const type_graphql_1 = require("type-graphql");
const entity_1 = require("../../../entity");
const types_1 = require("./types");
const typeorm_1 = require("typeorm");
const middleware_1 = require("../../../middleware");
const apollo_server_express_1 = require("apollo-server-express");
let RepeatScheduleResolver = class RepeatScheduleResolver {
    constructor() {
        this.repeatScheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.RepeatSchedule);
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
            throw new apollo_server_express_1.ValidationError("items not found, please provide a valid id");
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
            throw new apollo_server_express_1.ValidationError("item not found, please provide a valid id");
        this.repeatScheduleRepository.remove(q);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => entity_1.RepeatSchedule),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.RepeatScheduleArgs]),
    __metadata("design:returntype", Promise)
], RepeatScheduleResolver.prototype, "newRepeatSchedule", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Args)()),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.RepeatScheduleArgs, Object]),
    __metadata("design:returntype", Promise)
], RepeatScheduleResolver.prototype, "updateRepeatSchedule", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RepeatScheduleResolver.prototype, "deleteRepeatSchedule", null);
RepeatScheduleResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], RepeatScheduleResolver);
exports.RepeatScheduleResolver = RepeatScheduleResolver;
//# sourceMappingURL=repeatSchedule.resolver.js.map