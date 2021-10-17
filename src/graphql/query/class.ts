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

export { getClassesByDateQuery };
