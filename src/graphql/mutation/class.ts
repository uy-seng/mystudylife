const newClassMutation = `
    mutation(
        $subjectId: String!,
        $module: String,
        $room: String,
        $building: String,
        $teacher: String,
    ){
        newClass(
            subjectId: $subjectId,
            module: $module,
            room: $room,
            building: $building,
            teacher: $teacher
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

export { newClassMutation, deleteClassMutation };
