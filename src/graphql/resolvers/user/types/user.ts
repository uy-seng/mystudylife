import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class UserObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  provider: string | null;

  @Field(() => Int)
  tokenVersion: number;
}
