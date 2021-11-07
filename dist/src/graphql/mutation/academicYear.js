var newAcademicYearMutation = "\n    mutation(\n        $startDate: String!,\n        $endDate: String!,\n    ){\n        newAcademicYear(\n            startDate: $startDate,\n            endDate: $endDate,\n        )\n            {\n                id\n            }\n    }\n";
var deleteAcademicYearMutation = "\n    mutation(\n        $id: String!,\n    ){\n        deleteAcademicYear(\n            id: $id,\n        )\n    }\n";
export { newAcademicYearMutation, deleteAcademicYearMutation };
//# sourceMappingURL=academicYear.js.map