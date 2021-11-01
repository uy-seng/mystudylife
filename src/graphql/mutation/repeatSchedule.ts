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

export { newRepeatScheduleMutation, updateRepeatScheduleMutation };
