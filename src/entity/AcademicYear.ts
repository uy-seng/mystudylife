import { Field, ObjectType } from "type-graphql";
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
import { dateTransformer } from "../helper/date.utils";
import { AcademicYearWeekSchedule } from "./AcademicYearWeekSchedule";
import { AcademicYearDaySchedule } from "./AcademicYearDaySchedule";
import { academicYearSchedulingType } from "./types/academicYear";
import { User } from "./User";
import { AcademicYearTerm } from "./AcademicYearTerm";

@ObjectType()
@Entity("academic_year")
export class AcademicYear extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    transformer: dateTransformer,
  })
  start_date: Date;

  @Column({
    transformer: dateTransformer,
  })
  end_date: Date;

  @Column("text")
  schedulingType: academicYearSchedulingType;

  @ManyToOne(() => Task, (task) => task.academicYear)
  tasks: Task[];

  @OneToMany(() => Subject, (subject) => subject.academicYear)
  subjects: Subject[];

  @OneToMany(() => Class, (_class) => _class.academicYear)
  classes: Class[];

  @OneToOne(
    () => AcademicYearWeekSchedule,
    (academicYearWeekSchedule) => academicYearWeekSchedule.academicYear
  )
  academicYearWeekSchedule: AcademicYearWeekSchedule;

  @OneToMany(
    () => AcademicYearDaySchedule,
    (academicYearDaySchedule) => academicYearDaySchedule.academicYear
  )
  academicYearDaySchedules: AcademicYearDaySchedule[];

  @ManyToOne(() => User, (user) => user.academicYears)
  user: User;

  @OneToMany(
    () => AcademicYearTerm,
    (academicYearTerm) => academicYearTerm.academicYear
  )
  academicYearTerms: AcademicYearTerm[];
}
