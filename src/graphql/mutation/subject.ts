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

const updateSubjectMutation = `
    mutation(
        $id: String!, 
        $name: String!, 
        $academicYearId: String
    ) {
        updateSubject(
            id: $id,
            name: $name,
            academicYearId: $academicYearId
        )
    }
`;

export { newSubjectMutation, deleteSubjectMutation, updateSubjectMutation };
