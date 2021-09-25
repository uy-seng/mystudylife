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

export { newOneOffScheduleMutation };
