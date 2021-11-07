var getAcademicYearsQuery = "\n    query{\n        getAcademicYears{\n            id\n            startDate\n            endDate\n            terms{\n                id\n                name\n                startDate\n                endDate\n            }\n            schedule{\n                id\n                type\n                dayRotation{\n                    id\n                    numOfDay\n                    startDay\n                    repeatDays\n                }\n                weekRotation{\n                    id\n                    numOfWeek\n                    startWeek\n                }\n            }\n        }\n    }\n";
export { getAcademicYearsQuery };
//# sourceMappingURL=academicYear.js.map