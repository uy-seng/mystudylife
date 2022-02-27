"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClassMutation = exports.deleteClassMutation = exports.newClassMutation = void 0;
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
exports.newClassMutation = newClassMutation;
const deleteClassMutation = `
    mutation(
        $id: String!,
    ){
        deleteClass(
            id: $id,
        )
    }
`;
exports.deleteClassMutation = deleteClassMutation;
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
exports.updateClassMutation = updateClassMutation;
//# sourceMappingURL=class.js.map