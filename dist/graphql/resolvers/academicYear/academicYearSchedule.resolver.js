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
exports.AcademicYearScheduleResolver = void 0;
const entity_1 = require("../../../entity");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const types_1 = require("./types");
let AcademicYearScheduleResolver = class AcademicYearScheduleResolver {
    constructor() {
        this.scheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYearSchedule);
        this.weekRotationScheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.WeekRotationSchedule);
        this.dayRotationScheduleRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.DayRotationSchedule);
    }
    async newSchedule({ type, academicYearId }) {
        const newSchedule = await this.scheduleRepository.create({
            type: type,
            academicYearId: academicYearId,
        });
        return await this.scheduleRepository.save(newSchedule);
    }
    async newPartialWeekRotation({ scheduleId, numOfWeek, startWeek }) {
        const newWeekRotationSchedule = this.weekRotationScheduleRepository.create({
            numOfWeek: numOfWeek,
            startWeek: startWeek,
            scheduleId: scheduleId,
        });
        return await this.weekRotationScheduleRepository.save(newWeekRotationSchedule);
    }
    async newPartialDayRotation({ scheduleId, numOfDay, repeatDays, startDay }) {
        const newDayRotationSchedule = this.dayRotationScheduleRepository.create({
            startDay: startDay,
            numOfDay: numOfDay,
            repeatDays: repeatDays,
            scheduleId: scheduleId,
        });
        return await this.dayRotationScheduleRepository.save(newDayRotationSchedule);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => entity_1.AcademicYearSchedule),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.AcademicYearScheduleArgs]),
    __metadata("design:returntype", Promise)
], AcademicYearScheduleResolver.prototype, "newSchedule", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entity_1.WeekRotationSchedule),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.WeekRotationScheduleArgs]),
    __metadata("design:returntype", Promise)
], AcademicYearScheduleResolver.prototype, "newPartialWeekRotation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entity_1.DayRotationSchedule),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.DayRotationScheduleArgs]),
    __metadata("design:returntype", Promise)
], AcademicYearScheduleResolver.prototype, "newPartialDayRotation", null);
AcademicYearScheduleResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AcademicYearScheduleResolver);
exports.AcademicYearScheduleResolver = AcademicYearScheduleResolver;
//# sourceMappingURL=academicYearSchedule.resolver.js.map