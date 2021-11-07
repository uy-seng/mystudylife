"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneOffScheduleMutation = exports.newOneOffScheduleMutation = void 0;
const newOneOffScheduleMutation = `
    mutation(
        $scheduleId: String!,
        $date: String!,
        $startTime: String!,
        $endTime: String!
    ){
        newOneOffSchedule(
            scheduleId: $scheduleId,
            date: $date,
            startTime: $startTime,
            endTime: $endTime
        )
            {
                id
            }
    }
`;
exports.newOneOffScheduleMutation = newOneOffScheduleMutation;
const updateOneOffScheduleMutation = `
    mutation(
        $id: String!,
        $scheduleId: String!,
        $date: String!,
        $startTime: String!,
        $endTime: String!
    ){
        updateOneOffSchedule(
            id: $id,
            scheduleId: $scheduleId,
            date: $date,
            startTime: $startTime,
            endTime: $endTime
        )
    }
`;
exports.updateOneOffScheduleMutation = updateOneOffScheduleMutation;
//# sourceMappingURL=oneOffSchedule.js.map