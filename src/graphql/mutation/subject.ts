const newSubjectMutation = `
    mutation(
        $name: String!,
        $academicYearId: String,
        $termId: String,
    ){
        newSubject(
            name: $name,
            academicYearId: $academicYearId,
            termId: $termId,
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
