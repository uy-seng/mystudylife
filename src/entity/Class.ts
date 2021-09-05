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

@Entity("classes")
export class Class extends BaseEntity {
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

  @OneToMany(() => ClassIncur, (classIncur) => classIncur.class)
  classIncurs: ClassIncur[];

  @OneToOne(() => Subject, (subject) => subject.class)
  subject: Subject;

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.classes)
  academicYear: AcademicYear;

  @ManyToOne(() => AcademicYearTerm, (term) => term.classes)
  term: AcademicYearTerm;

  @ManyToOne(() => User, (user) => user.classes)
  user: User;
}
