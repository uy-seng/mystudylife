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
import { AcademicYear } from "./AcademicYear";
import { AcademicYearTerm } from "./AcademicYearTerm";
import { ClassIncur } from "./ClassIncur";
import { Subject } from "./Subject";
import { User } from "./User";

@ObjectType()
@Entity("class")
export class Class extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  module: string;

  @Column()
  room: string;

  @Column()
  building: string;

  @Column()
  teacher: string;

  @OneToOne(() => Subject, (subject) => subject.class)
  subject: Subject;

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.classes)
  academicYear: AcademicYear;

  @ManyToOne(
    () => AcademicYearTerm,
    (academicYearTerm) => academicYearTerm.classes
  )
  academicYearTerm: AcademicYearTerm;

  @ManyToOne(() => User, (user) => user.classes)
  user: User;

  @OneToMany(() => ClassIncur, (classIncur) => classIncur.class)
  classIncurs: ClassIncur[];
}
