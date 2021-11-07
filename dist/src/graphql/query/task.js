"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskByIdQuery = exports.getTasksQuery = exports.getTasksByDateQuery = void 0;
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
exports.getTasksByDateQuery = getTasksByDateQuery;
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
exports.getTasksQuery = getTasksQuery;
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
exports.getTaskByIdQuery = getTaskByIdQuery;
//# sourceMappingURL=task.js.map