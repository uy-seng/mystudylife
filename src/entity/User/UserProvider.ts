import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "..";

@Entity("user_provider")
@ObjectType()
export class UserProvider {
  @PrimaryColumn()
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @OneToOne(() => User)
  user: User;
}
