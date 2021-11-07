"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newClassScheduleMutation = void 0;
const newClassScheduleMutation = `
    mutation(
        $classId: String!,
        $type: ClassScheduleType!,
    ){
        newClassSchedule(
            classId: $classId,
            type: $type,
        )
            {
                id
            }
    }
`;
exports.newClassScheduleMutation = newClassScheduleMutation;
//# sourceMappingURL=classSchedule.js.map