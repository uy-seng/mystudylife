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
export { newOneOffScheduleMutation, updateOneOffScheduleMutation };
//# sourceMappingURL=oneOffSchedule.js.map