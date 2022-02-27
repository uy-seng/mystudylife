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

export const deleteHolidayMutation = `
    mutation(
        $id: String!,
    ){
        deleteHoliday(
            id: $id,
        )
    }
`;

export const updateHolidayMutation = `
    mutation(
        $id: String!,
        $name: String!,
        $startDate: String!,
        $endDate: String!,
        $academicYearId: String!,
    ){
        updateHoliday(
            id: $id,
            name: $name,
            startDate: $startDate,
            endDate: $endDate,
            academicYearId: $academicYearId
        )
    }
`;
