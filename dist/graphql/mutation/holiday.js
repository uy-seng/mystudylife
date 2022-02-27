"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHolidayMutation = exports.deleteHolidayMutation = exports.newHolidayMutation = void 0;
exports.newHolidayMutation = `
    mutation(
        $academicYearId: String!,
        $name: String!,
        $startDate: String!,
        $endDate: String!
    ){
        newHoliday(
            academicYearId: $academicYearId,
            name: $name,
            startDate: $startDate,
            endDate: $endDate,
        )
            {
                id
            }
    }
`;
exports.deleteHolidayMutation = `
    mutation(
        $id: String!,
    ){
        deleteHoliday(
            id: $id,
        )
    }
`;
exports.updateHolidayMutation = `
    mutation(
        $id: String!,
        $name: String!,
        $startDate: String!,
        $endDate: String!,
        $academicYearId: String!,
    ){
        updateHoliday(
            id: $id,
            name: $name,
            startDate: $startDate,
            endDate: $endDate,
            academicYearId: $academicYearId
        )
    }
`;
//# sourceMappingURL=holiday.js.map