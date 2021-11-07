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
export { newPartialDayRotationMutation, newScheduleMutation, newPartialWeekRotationMutation, };
//# sourceMappingURL=academicYearSchedule.js.map