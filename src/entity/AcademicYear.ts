import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  Task,
  Subject,
  Class,
  AcademicYearWeekRotationSchedule,
  AcademicYearDayRotationSchedule,
  AcademicYearTerm,
  User,
} from ".";
import { academicYearSchedulingType } from "./types";

@Entity("academic_years")
export class AcademicYear {
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
