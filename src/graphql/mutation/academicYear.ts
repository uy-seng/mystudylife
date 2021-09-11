const newAcademicYearMutation = `
    mutation(
        $newAcademicYearId: String!,
        $newAcademicYearStartDate: String!,
        $newAcademicYearEndDate: String!,
        $newAcademicYearScheduleId: String!
    ){
        newAcademicYear(
            id: $newAcademicYearId,
            startDate: $newAcademicYearStartDate,
            endDate: $newAcademicYearEndDate,
            scheduleId: $newAcademicYearScheduleId
        )
            {
                id
            }
    }
`;

export { newAcademicYearMutation };
