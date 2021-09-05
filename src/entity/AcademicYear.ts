import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Class } from "./Class";
import { Subject } from "./Subject";
import { Task } from "./Task";
import { AcademicYearWeekRotationSchedule } from "./AcademicYearWeekRotationSchedule";
import { AcademicYearDayRotationSchedule } from "./AcademicYearDayRotationSchedule";
import { academicYearSchedulingType } from "./types/academicYear";
import { User } from "./User";
import { AcademicYearTerm } from "./AcademicYearTerm";

@Entity("academic_years")
export class AcademicYear extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date")
  start_date: string;

  @Column("date")
  end_date: string;

  @Column("text")
  schedulingType: academicYearSchedulingType;

  @ManyToOne(() => Task, (task) => task.academicYear, { nullable: true })
  tasks: Task[];

  @OneToMany(() => Subject, (subject) => subject.academicYear, {
    nullable: true,
  })
  subjects: Subject[];

  @OneToMany(() => Class, (_class) => _class.academicYear, { nullable: true })
  classes: Class[];

  @OneToOne(
    () => AcademicYearWeekRotationSchedule,
    (weekRotationSchedule) => weekRotationSchedule.academicYear,
    { nullable: true, cascade: true }
  )
  weekRotationSchedules: AcademicYearWeekRotationSchedule[];

  @OneToMany(
    () => AcademicYearDayRotationSchedule,
    (dayRotationSchedule) => dayRotationSchedule.academicYear,
    { nullable: true, cascade: true }
  )
  dayRotationSchedules: AcademicYearDayRotationSchedule[];

  @OneToMany(() => AcademicYearTerm, (term) => term.academicYear, {
    nullable: true,
    cascade: true,
  })
  terms: AcademicYearTerm[];

  @ManyToOne(() => User, (user) => user.academicYears)
  user: User;
}
