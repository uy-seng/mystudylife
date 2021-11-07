"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectsQuery = void 0;
const getSubjectsQuery = `
    query{
        getSubjects{
            id
            name
            academicYear{
                id
                startDate
                endDate
            }
        }
    }
`;
exports.getSubjectsQuery = getSubjectsQuery;
//# sourceMappingURL=subject.js.map