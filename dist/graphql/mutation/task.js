"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskMutation = exports.deleteTaskMutation = exports.newTaskMutation = void 0;
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
exports.newTaskMutation = newTaskMutation;
const deleteTaskMutation = `
    mutation(
        $id: String!,
    ){
        deleteTask(
            id: $id,
        )
    }
`;
exports.deleteTaskMutation = deleteTaskMutation;
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
exports.updateTaskMutation = updateTaskMutation;
//# sourceMappingURL=task.js.map