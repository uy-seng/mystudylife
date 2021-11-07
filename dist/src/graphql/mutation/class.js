var newClassMutation = "\n    mutation(\n        $subjectId: String!,\n        $module: String,\n        $room: String,\n        $building: String,\n        $teacher: String,\n        $academicYearId: String,\n    ){\n        newClass(\n            subjectId: $subjectId,\n            module: $module,\n            room: $room,\n            building: $building,\n            teacher: $teacher\n            academicYearId: $academicYearId\n        )\n            {\n                id\n            }\n    }\n";
var deleteClassMutation = "\n    mutation(\n        $id: String!,\n    ){\n        deleteClass(\n            id: $id,\n        )\n    }\n";
var updateClassMutation = "\n    mutation(\n        $id: String!,\n        $subjectId: String!,\n        $module: String,\n        $room: String,\n        $building: String,\n        $teacher: String,\n        $academicYearId: String,\n    ){\n        updateClass(\n            id: $id,\n            subjectId: $subjectId,\n            module: $module,\n            room: $room,\n            building: $building,\n            teacher: $teacher\n            academicYearId: $academicYearId\n        )\n    }\n";
export { newClassMutation, deleteClassMutation, updateClassMutation };
//# sourceMappingURL=class.js.map