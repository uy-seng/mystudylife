"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRepeatScheduleMutation = exports.newRepeatScheduleMutation = void 0;
const newRepeatScheduleMutation = `
    mutation(
        $scheduleId: String!,
        $startTime: String!,
        $endTime: String!,
        $repeatDays: [DayOfWeek!]!,
        $startDate: String,
        $endDate: String
    ){
        newRepeatSchedule(
            scheduleId: $scheduleId,
            startTime: $startTime,
            endTime: $endTime,
            repeatDays: $repeatDays,
            startDate: $startDate,
            endDate: $endDate
        )
            {
                id
            }
    }
`;
exports.newRepeatScheduleMutation = newRepeatScheduleMutation;
const updateRepeatScheduleMutation = `
    mutation(
        $id: String!,
        $scheduleId: String!,
        $startTime: String!,
        $endTime: String!,
        $repeatDays: [DayOfWeek!]!,
        $startDate: String,
        $endDate: String
    ){
        updateRepeatSchedule(
            id: $id,
            scheduleId: $scheduleId,
            startTime: $startTime,
            endTime: $endTime,
            repeatDays: $repeatDays,
            startDate: $startDate,
            endDate: $endDate
        )
    }
`;
exports.updateRepeatScheduleMutation = updateRepeatScheduleMutation;
//# sourceMappingURL=repeatSchedule.js.map