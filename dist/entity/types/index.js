"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleType = exports.AcademicYearScheduleType = exports.DayOfWeek = exports.TaskType = void 0;
const Task_1 = require("./Task");
Object.defineProperty(exports, "TaskType", { enumerable: true, get: function () { return Task_1.TaskType; } });
const AcademicSchedule_1 = require("./AcademicSchedule");
Object.defineProperty(exports, "AcademicYearScheduleType", { enumerable: true, get: function () { return AcademicSchedule_1.AcademicYearScheduleType; } });
const ClassSchedule_1 = require("./ClassSchedule");
Object.defineProperty(exports, "ClassScheduleType", { enumerable: true, get: function () { return ClassSchedule_1.ClassScheduleType; } });
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["monday"] = 1] = "monday";
    DayOfWeek[DayOfWeek["tuesday"] = 2] = "tuesday";
    DayOfWeek[DayOfWeek["wednesday"] = 3] = "wednesday";
    DayOfWeek[DayOfWeek["thursday"] = 4] = "thursday";
    DayOfWeek[DayOfWeek["friday"] = 5] = "friday";
    DayOfWeek[DayOfWeek["saturday"] = 6] = "saturday";
    DayOfWeek[DayOfWeek["sunday"] = 0] = "sunday";
})(DayOfWeek || (DayOfWeek = {}));
exports.DayOfWeek = DayOfWeek;
//# sourceMappingURL=index.js.map