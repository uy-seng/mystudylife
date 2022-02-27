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
exports.HolidayResolver = void 0;
const type_graphql_1 = require("type-graphql");
const middleware_1 = require("../../../middleware");
const types_1 = require("./types");
const typeorm_1 = require("typeorm");
const entity_1 = require("../../../entity");
const apollo_server_errors_1 = require("apollo-server-errors");
let HolidayResolver = class HolidayResolver {
    constructor() {
        this.holidayRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.Holiday);
        this.userRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.User);
        this.academicYearRepository = (0, typeorm_1.getConnection)(process.env.NODE_ENV).getRepository(entity_1.AcademicYear);
    }
    async newHoliday({ startDate, endDate, academicYearId, name }, { user }) {
        const newHoliday = this.holidayRepository.create({
            name: name,
            startDate: startDate,
            endDate: endDate,
        });
        const currentUser = await this.userRepository.findOne(user.id);
        if (!currentUser)
            throw new apollo_server_errors_1.ValidationError("invalid user");
        newHoliday.user = currentUser;
        const academicYear = await this.academicYearRepository.findOne(academicYearId);
        if (!academicYear)
            throw new apollo_server_errors_1.ValidationError("invalid academic year id");
        newHoliday.academicYear = academicYear;
        return await this.holidayRepository.save(newHoliday);
    }
    async deleteHoliday(id, { user }) {
        const holiday = await this.holidayRepository.findOne(id, {
            relations: ["user"],
            where: {
                user: {
                    id: user.id,
                },
            },
        });
        if (!holiday)
            throw new apollo_server_errors_1.ValidationError("invalid holiday id");
        await this.holidayRepository.remove(holiday);
        return true;
    }
    async updateHoliday(updateContext, { user }) {
        const holiday = await this.holidayRepository.findOne(updateContext.id, {
            relations: ["user"],
            where: {
                user: {
                    id: user.id,
                },
            },
        });
        if (!holiday)
            throw new apollo_server_errors_1.ValidationError("invalid holiday id");
        holiday.name = updateContext.name;
        holiday.startDate = updateContext.startDate;
        holiday.endDate = updateContext.endDate;
        await this.holidayRepository.save(holiday);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => entity_1.Holiday),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.HolidayArgs, Object]),
    __metadata("design:returntype", Promise)
], HolidayResolver.prototype, "newHoliday", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HolidayResolver.prototype, "deleteHoliday", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(middleware_1.authenticationGate),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UpdateHolidayArgs, Object]),
    __metadata("design:returntype", Promise)
], HolidayResolver.prototype, "updateHoliday", null);
HolidayResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], HolidayResolver);
exports.HolidayResolver = HolidayResolver;
//# sourceMappingURL=holiday.resolver.js.map