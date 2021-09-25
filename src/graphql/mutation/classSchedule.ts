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

export { newClassScheduleMutation };
