var newTaskMutation = "\n    mutation(\n        $subjectId: String!,\n        $academicYearId: String,\n        $type: TaskType!,\n        $due_date: String!,\n        $title: String,\n        $detail: String\n    ){\n        newTask(\n            subjectId: $subjectId,\n            academicYearId: $academicYearId,\n            type: $type,\n            due_date: $due_date,\n            title: $title,\n            detail: $detail\n        )\n            {\n                id\n            }\n    }\n";
var deleteTaskMutation = "\n    mutation(\n        $id: String!,\n    ){\n        deleteTask(\n            id: $id,\n        )\n    }\n";
var updateTaskMutation = "\n    mutation(\n        $id: String!,\n        $subjectId: String!,\n        $academicYearId: String,\n        $type: TaskType!,\n        $due_date: String!,\n        $title: String,\n        $detail: String\n    ){\n        updateTask(\n            id: $id,\n            subjectId: $subjectId,\n            academicYearId: $academicYearId,\n            type: $type,\n            due_date: $due_date,\n            title: $title,\n            detail: $detail\n        )\n    }\n";
export { newTaskMutation, deleteTaskMutation, updateTaskMutation };
//# sourceMappingURL=task.js.map