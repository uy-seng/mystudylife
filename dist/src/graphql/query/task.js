const getTasksByDateQuery = `
    query($date: DateTime!){
        getTasksByDate(date: $date){
            id
            title
            detail
            type
            due_date
            academicYear{
                id
                startDate
                endDate
            }
            subject{
                id
                name
            }
        }
    }
`;
const getTasksQuery = `
    query{
        getTasks{
            id
            title
            detail
            type
            due_date
            academicYear{
                id
                startDate
                endDate
            }
            subject{
                id
                name
            }
        }
    }
`;
const getTaskByIdQuery = `
    query($id: String!){
        getTaskById(id: $id){
            id
            title
            detail
            type
            due_date
            academicYear{
                id
                startDate
                endDate
            }
            subject{
                id
                name
            }
        }
    }
`;
export { getTasksByDateQuery, getTasksQuery, getTaskByIdQuery };
//# sourceMappingURL=task.js.map