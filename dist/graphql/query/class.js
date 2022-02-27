"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassByIdQuery = exports.getClassesQuery = exports.getClassesByDateQuery = void 0;
const getClassesByDateQuery = `
    query($date: DateTime!){
        getClassesByDate(date: $date){
            id
            building
            module
            room
            teacher
            schedule{
                id
                type
                oneOff {
                    id
                    date
                    startTime
                    endTime
                }
                repeat {
                    id
                    startTime
                    endTime
                    repeatDays
                    startDate
                    endDate
                }
            }
        }
    }
`;
exports.getClassesByDateQuery = getClassesByDateQuery;
const getClassesQuery = `
    query{
        getClasses{
            id
            building
            module
            room
            teacher
            subject{
                id
                name
            }
            academicYear{
                id
                startDate
                endDate
            }
            schedule{
                id
                type
                oneOff {
                    id
                    date
                    startTime
                    endTime
                }
                repeat {
                    id
                    startTime
                    endTime
                    repeatDays
                    startDate
                    endDate
                }
            }
        }
    }
`;
exports.getClassesQuery = getClassesQuery;
const getClassByIdQuery = `
    query($id: String!){
        getClassById(id: $id){
            id
            building
            module
            room
            teacher
            subject{
                id
                name
            }
            academicYear{
                id
                startDate
                endDate
            }
            term{
                id
            }
            schedule{
                id
                type
                oneOff {
                    id
                    date
                    startTime
                    endTime
                }
                repeat {
                    id
                    startTime
                    endTime
                    repeatDays
                    startDate
                    endDate
                }
            }
        }
    }
`;
exports.getClassByIdQuery = getClassByIdQuery;
//# sourceMappingURL=class.js.map