const newAcademicYearMutation = `
    mutation(
        $startDate: String!,
        $endDate: String!,
    ){
        newAcademicYear(
            startDate: $startDate,
            endDate: $endDate,
        )
            {
                id
            }
    }
`;

const deleteAcademicYearMutation = `
    mutation(
        $id: String!,
    ){
        deleteAcademicYear(
            id: $id,
        )
    }
`;

export { newAcademicYearMutation, deleteAcademicYearMutation };
