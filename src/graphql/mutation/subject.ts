const newSubjectMutation = `
    mutation(
        $name: String!,
        $academicYearId: String,
    ){
        newSubject(
            name: $name,
            academicYearId: $academicYearId,
        )
            {
                id
            }
    }
`;

const deleteSubjectMutation = `
    mutation(
        $id: String!,
    ){
        deleteSubject(
            id: $id,
        )
    }
`;

export { newSubjectMutation, deleteSubjectMutation };
