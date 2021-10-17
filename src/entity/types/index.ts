import { TaskType } from "./Task";
import { AcademicYearScheduleType } from "./AcademicSchedule";
import { ClassScheduleType } from "./ClassSchedule";

enum DayOfWeek {
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
  sunday = 0,
}

export { TaskType, DayOfWeek, AcademicYearScheduleType, ClassScheduleType };
