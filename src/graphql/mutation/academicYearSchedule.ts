const newScheduleMutation = `
    mutation(
        $newScheduleType: String!,
        $newScheduleAcademicYearId: String!
    ){
        newSchedule(
            type: $newScheduleType,
            academicYearId: $newScheduleAcademicYearId
        )
            {
                id
            }
    }
`;

const newPartialDayRotationMutation = `
    mutation(
        $newPartialDayRotationStartDay: Int!,
        $newPartialDayRotationNumOfDay: Int!,
        $newPartialDayRotationRepeatDays: [Int!]!,
        $newPartialDayRotationScheduleId: String!
    ){
        newPartialDayRotation(
            startDay: $newPartialDayRotationStartDay,
            numOfDay: $newPartialDayRotationNumOfDay,
            repeatDays: $newPartialDayRotationRepeatDays,
            scheduleId: $newPartialDayRotationScheduleId
        )
            {
                id
            }
    }
`;

const newPartialWeekRotationMutation = `
    mutation(
        $newPartialWeekRotationNumOfWeek: Int!,
        $newPartialWeekRotationStartWeek: Int!,
        $newPartialWeekRotationScheduleId: String!
    ){
        newPartialWeekRotation(
            numOfWeek: $newPartialWeekRotationNumOfWeek,
            startWeek: $newPartialWeekRotationStartWeek,
            scheduleId: $newPartialWeekRotationScheduleId
        )
            {
                id
            }
    }
`;

export {
  newPartialDayRotationMutation,
  newScheduleMutation,
  newPartialWeekRotationMutation,
};
