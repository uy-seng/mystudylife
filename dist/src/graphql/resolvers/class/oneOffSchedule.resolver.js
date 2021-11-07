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
exports.OneOffScheduleResolver = void 0;
const type_graphql_1 = require("type-graphql");
const entity_1 = require("src/entity");
const types_1 = require("./types");
const typeorm_1 = require("typeorm");
const middleware_1 = require("src/middleware");
const apollo_server_express_1 = require("apollo-server-express");
const oneOffSchedule_1 = require("./types/oneOffSchedule");
let OneOffScheduleResolver = class OneOffScheduleResolver {
    constructor() {
        this.oneOffScheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.OneOffSchedule);
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
            throw new apollo_server_express_1.ValidationError("items not found, please provide a valid id");
        q.date = updateContext.date;
        q.endTime = updateContext.endTime;
        q.startTime = updateContext.startTime;
        await this.oneOffScheduleRepository.save(q);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => entity_1.OneOffSchedule),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.OneOffScheduleArgs]),
    __metadata("design:returntype", Promise)
], OneOffScheduleResolver.prototype, "newOneOffSchedule", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [oneOffSchedule_1.UpdateOneOffScheduleArgs, Object]),
    __metadata("design:returntype", Promise)
], OneOffScheduleResolver.prototype, "updateOneOffSchedule", null);
OneOffScheduleResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], OneOffScheduleResolver);
exports.OneOffScheduleResolver = OneOffScheduleResolver;
//# sourceMappingURL=oneOffSchedule.resolver.js.map