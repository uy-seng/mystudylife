export const newHolidayMutation = `
    mutation(
        $academicYearId: String!,
        $name: String!,
        $startDate: String!,
        $endDate: String!
    ){
        newHoliday(
            academicYearId: $academicYearId,
            name: $name,
            startDate: $startDate,
            endDate: $endDate,
        )
            {
                id
            }
    }
`;
