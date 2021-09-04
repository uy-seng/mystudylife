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

  @Field(() => String)
  @Column()
  module: string;

  @Field(() => String)
  @Column()
  room: string;

  @Field(() => String)
  @Column()
  building: string;

  @Field(() => String)
  @Column()
  teacher: string;

  @OneToMany(() => ClassIncur, (classIncur) => classIncur.class)
  classIncurs: ClassIncur[];

  @Field(() => Subject)
  @OneToOne(() => Subject, (subject) => subject.class)
  subject: Subject;

  @Field(() => AcademicYear)
  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.classes)
  academicYear: AcademicYear;

  @Field(() => AcademicYearTerm)
  @ManyToOne(() => AcademicYearTerm, (term) => term.classes)
  term: AcademicYearTerm;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.classes)
  user: User;
}
