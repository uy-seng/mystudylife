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
import { AcademicYearSchedule, DayRotationSchedule, WeekRotationSchedule, } from "../../../entity";
import { Args, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { AcademicYearScheduleArgs, DayRotationScheduleArgs, WeekRotationScheduleArgs, } from "./types";
let AcademicYearScheduleResolver = class AcademicYearScheduleResolver {
    constructor() {
        this.scheduleRepository = getConnection(process.env.NODE_ENV).getRepository(AcademicYearSchedule);
        this.weekRotationScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(WeekRotationSchedule);
        this.dayRotationScheduleRepository = getConnection(process.env.NODE_ENV).getRepository(DayRotationSchedule);
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
    Mutation(() => AcademicYearSchedule),
    __param(0, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicYearScheduleArgs]),
    __metadata("design:returntype", Promise)
], AcademicYearScheduleResolver.prototype, "newSchedule", null);
__decorate([
    Mutation(() => WeekRotationSchedule),
    __param(0, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WeekRotationScheduleArgs]),
    __metadata("design:returntype", Promise)
], AcademicYearScheduleResolver.prototype, "newPartialWeekRotation", null);
__decorate([
    Mutation(() => DayRotationSchedule),
    __param(0, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DayRotationScheduleArgs]),
    __metadata("design:returntype", Promise)
], AcademicYearScheduleResolver.prototype, "newPartialDayRotation", null);
AcademicYearScheduleResolver = __decorate([
    Resolver()
], AcademicYearScheduleResolver);
export { AcademicYearScheduleResolver };
//# sourceMappingURL=academicYearSchedule.resolver.js.map