const newTaskMutation = `
    mutation(
        $subjectId: String!,
        $academicYearId: String,
        $type: TaskType!,
        $due_date: String!,
        $title: String,
        $detail: String
    ){
        newTask(
            subjectId: $subjectId,
            academicYearId: $academicYearId,
            type: $type,
            due_date: $due_date,
            title: $title,
            detail: $detail
        )
            {
                id
            }
    }
`;

const deleteTaskMutation = `
    mutation(
        $id: String!,
    ){
        deleteTask(
            id: $id,
        )
    }
`;

const updateTaskMutation = `
    mutation(
        $id: String!,
        $subjectId: String!,
        $academicYearId: String,
        $type: TaskType!,
        $due_date: String!,
        $title: String,
        $detail: String
    ){
        updateTask(
            id: $id,
            subjectId: $subjectId,
            academicYearId: $academicYearId,
            type: $type,
            due_date: $due_date,
            title: $title,
            detail: $detail
        )
    }
`;

export { newTaskMutation, deleteTaskMutation, updateTaskMutation };
