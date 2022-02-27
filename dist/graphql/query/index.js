"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksQuery = exports.getTasksByDateQuery = exports.getTaskByIdQuery = exports.getClassesQuery = exports.getClassByIdQuery = exports.getSubjectsQuery = exports.getClassesByDateQuery = exports.meQuery = exports.getAcademicYearsQuery = void 0;
const academicYear_1 = require("./academicYear");
Object.defineProperty(exports, "getAcademicYearsQuery", { enumerable: true, get: function () { return academicYear_1.getAcademicYearsQuery; } });
const auth_1 = require("./auth");
Object.defineProperty(exports, "meQuery", { enumerable: true, get: function () { return auth_1.meQuery; } });
const class_1 = require("./class");
Object.defineProperty(exports, "getClassesByDateQuery", { enumerable: true, get: function () { return class_1.getClassesByDateQuery; } });
Object.defineProperty(exports, "getClassByIdQuery", { enumerable: true, get: function () { return class_1.getClassByIdQuery; } });
Object.defineProperty(exports, "getClassesQuery", { enumerable: true, get: function () { return class_1.getClassesQuery; } });
const subject_1 = require("./subject");
Object.defineProperty(exports, "getSubjectsQuery", { enumerable: true, get: function () { return subject_1.getSubjectsQuery; } });
const task_1 = require("./task");
Object.defineProperty(exports, "getTaskByIdQuery", { enumerable: true, get: function () { return task_1.getTaskByIdQuery; } });
Object.defineProperty(exports, "getTasksByDateQuery", { enumerable: true, get: function () { return task_1.getTasksByDateQuery; } });
Object.defineProperty(exports, "getTasksQuery", { enumerable: true, get: function () { return task_1.getTasksQuery; } });
//# sourceMappingURL=index.js.map