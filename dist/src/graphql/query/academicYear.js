"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAcademicYearsQuery = void 0;
const getAcademicYearsQuery = `
    query{
        getAcademicYears{
            id
            startDate
            endDate
            terms{
                id
                name
                startDate
                endDate
            }
            schedule{
                id
                type
                dayRotation{
                    id
                    numOfDay
                    startDay
                    repeatDays
                }
                weekRotation{
                    id
                    numOfWeek
                    startWeek
                }
            }
        }
    }
`;
exports.getAcademicYearsQuery = getAcademicYearsQuery;
//# sourceMappingURL=academicYear.js.map