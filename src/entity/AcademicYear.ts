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

  @Field(() => String)
  @Column("date")
  start_date: string;

  @Field(() => String)
  @Column("date")
  end_date: string;

  @Field(() => String)
  @Column("text")
  schedulingType: academicYearSchedulingType;

  @Field(() => [Task])
  @ManyToOne(() => Task, (task) => task.academicYear)
  tasks: Task[];

  @Field(() => [Subject])
  @OneToMany(() => Subject, (subject) => subject.academicYear)
  subjects: Subject[];

  @Field(() => [Class])
  @OneToMany(() => Class, (_class) => _class.academicYear)
  classes: Class[];

  @Field(() => [AcademicYearWeekSchedule])
  @OneToOne(
    () => AcademicYearWeekSchedule,
    (weeklySchedule) => weeklySchedule.academicYear
  )
  weeklySchedules: AcademicYearWeekSchedule[];

  @Field(() => [AcademicYearDaySchedule])
  @OneToMany(
    () => AcademicYearDaySchedule,
    (dailySchedule) => dailySchedule.academicYear
  )
  dailySchedules: AcademicYearDaySchedule[];

  @Field(() => [AcademicYearTerm])
  @OneToMany(() => AcademicYearTerm, (term) => term.academicYear)
  terms: AcademicYearTerm[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.academicYears)
  user: User;
}
