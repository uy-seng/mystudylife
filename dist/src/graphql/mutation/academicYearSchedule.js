"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPartialWeekRotationMutation = exports.newScheduleMutation = exports.newPartialDayRotationMutation = void 0;
const newScheduleMutation = `
    mutation(
        $type: AcademicYearScheduleType!,
        $academicYearId: String!
    ){
        newSchedule(
            type: $type,
            academicYearId: $academicYearId
        )
            {
                id
            }
    }
`;
exports.newScheduleMutation = newScheduleMutation;
const newPartialDayRotationMutation = `
    mutation(
        $startDay: Int!,
        $numOfDay: Int!,
        $repeatDays: [Int!]!,
        $scheduleId: String!
    ){
        newPartialDayRotation(
            startDay: $startDay,
            numOfDay: $numOfDay,
            repeatDays: $repeatDays,
            scheduleId: $scheduleId
        )
            {
                id
            }
    }
`;
exports.newPartialDayRotationMutation = newPartialDayRotationMutation;
const newPartialWeekRotationMutation = `
    mutation(
        $numOfWeek: Int!,
        $startWeek: Int!,
        $scheduleId: String!
    ){
        newPartialWeekRotation(
            numOfWeek: $numOfWeek,
            startWeek: $startWeek,
            scheduleId: $scheduleId
        )
            {
                id
            }
    }
`;
exports.newPartialWeekRotationMutation = newPartialWeekRotationMutation;
//# sourceMappingURL=academicYearSchedule.js.map