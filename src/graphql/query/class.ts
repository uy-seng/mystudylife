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

export { getClassesByDateQuery, getClassesQuery, getClassByIdQuery };
