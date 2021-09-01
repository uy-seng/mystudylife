import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @Field(() => String, { nullable: true })
  @Column({ unique: true, nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  provider: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  providerId: string;

  @Field(() => Int)
  @Column({ default: 0 })
  tokenVersion: number;
}
