const newClassMutation = `
    mutation(
        $subjectId: String!,
        $module: String,
        $room: String,
        $building: String,
        $teacher: String,
        $academicYearId: String,
        $termId: String
    ){
        newClass(
            subjectId: $subjectId,
            module: $module,
            room: $room,
            building: $building,
            teacher: $teacher
            academicYearId: $academicYearId
            termId: $termId
        )
            {
                id
            }
    }
`;

const deleteClassMutation = `
    mutation(
        $id: String!,
    ){
        deleteClass(
            id: $id,
        )
    }
`;

const updateClassMutation = `
    mutation(
        $id: String!,
        $subjectId: String!,
        $module: String,
        $room: String,
        $building: String,
        $teacher: String,
        $academicYearId: String,
        $termId: String
    ){
        updateClass(
            id: $id,
            subjectId: $subjectId,
            module: $module,
            room: $room,
            building: $building,
            teacher: $teacher
            academicYearId: $academicYearId
            termId: $termId
        )
    }
`;

export { newClassMutation, deleteClassMutation, updateClassMutation };
