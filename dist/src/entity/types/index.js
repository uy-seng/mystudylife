import { TaskType } from "./Task";
import { AcademicYearScheduleType } from "./AcademicSchedule";
import { ClassScheduleType } from "./ClassSchedule";
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
export { TaskType, DayOfWeek, AcademicYearScheduleType, ClassScheduleType };
//# sourceMappingURL=index.js.map