"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubjectMutation = exports.deleteSubjectMutation = exports.newSubjectMutation = void 0;
const newSubjectMutation = `
    mutation(
        $name: String!,
        $academicYearId: String,
    ){
        newSubject(
            name: $name,
            academicYearId: $academicYearId,
        )
            {
                id
            }
    }
`;
exports.newSubjectMutation = newSubjectMutation;
const deleteSubjectMutation = `
    mutation(
        $id: String!,
    ){
        deleteSubject(
            id: $id,
        )
    }
`;
exports.deleteSubjectMutation = deleteSubjectMutation;
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
exports.updateSubjectMutation = updateSubjectMutation;
//# sourceMappingURL=subject.js.map