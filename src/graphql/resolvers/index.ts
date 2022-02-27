import { AcademicYearResolver } from "./academicYear/academicYear.resolver";
import { AcademicYearScheduleResolver } from "./academicYear/academicYearSchedule.resolver";
import { TermResolver } from "./academicYear/term.resolver";
import { AuthResolver } from "./auth/auth.resolver";
import { ClassResolver } from "./class/class.resolver";
import { ClassScheduleResolver } from "./class/classSchedule.resolver";
import { OneOffScheduleResolver } from "./class/oneOffSchedule.resolver";
import { RepeatScheduleResolver } from "./class/repeatSchedule.resolver";
import { HolidayResolver } from "./holiday/holiday.resolver";
import { SubjectResolver } from "./subject/subject.resolver";
import { TaskResolver } from "./task/task.resolver";

export {
  AuthResolver,
  AcademicYearResolver,
  AcademicYearScheduleResolver,
  TermResolver,
  SubjectResolver,
  ClassResolver,
  ClassScheduleResolver,
  OneOffScheduleResolver,
  RepeatScheduleResolver,
  HolidayResolver,
  TaskResolver
};
