"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTermMutation = void 0;
const newTermMutation = `
    mutation(
        $name: String!,
        $startDate: String!,
        $endDate: String!,
        $academicYearId: String!
    ){
        newTerm(
            name: $name,
            startDate: $startDate,
            endDate: $endDate,
            academicYearId: $academicYearId
        )
            {
                id
            }
    }
`;
exports.newTermMutation = newTermMutation;
//# sourceMappingURL=term.js.map