const newTermMutation = `
    mutation(
        $newTermName: String!,
        $newTermStartDate: String!,
        $newTermEndDate: String!,
        $newTermAcademicYearId: String!
    ){
        newTerm(
            name: $newTermName,
            startDate: $newTermStartDate,
            endDate: $newTermEndDate,
            academicYearId: $newTermAcademicYearId
        )
            {
                id
            }
    }
`;

export { newTermMutation };
