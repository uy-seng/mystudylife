import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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
  startDate: string;

  @Column("date")
  endDate: string;

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

  @OneToOne(() => AcademicYearWeekRotationSchedule, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  weekRotationSchedule: AcademicYearWeekRotationSchedule;

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
