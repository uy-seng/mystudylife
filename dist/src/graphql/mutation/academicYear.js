"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAcademicYearMutation = exports.newAcademicYearMutation = void 0;
const newAcademicYearMutation = `
    mutation(
        $startDate: String!,
        $endDate: String!,
    ){
        newAcademicYear(
            startDate: $startDate,
            endDate: $endDate,
        )
            {
                id
            }
    }
`;
exports.newAcademicYearMutation = newAcademicYearMutation;
const deleteAcademicYearMutation = `
    mutation(
        $id: String!,
    ){
        deleteAcademicYear(
            id: $id,
        )
    }
`;
exports.deleteAcademicYearMutation = deleteAcademicYearMutation;
//# sourceMappingURL=academicYear.js.map