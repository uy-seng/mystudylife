var newClassScheduleMutation = "\n    mutation(\n        $classId: String!,\n        $type: ClassScheduleType!,\n    ){\n        newClassSchedule(\n            classId: $classId,\n            type: $type,\n        )\n            {\n                id\n            }\n    }\n";
export { newClassScheduleMutation };
//# sourceMappingURL=classSchedule.js.map