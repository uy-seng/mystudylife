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
export { getAcademicYearsQuery };
//# sourceMappingURL=academicYear.js.map