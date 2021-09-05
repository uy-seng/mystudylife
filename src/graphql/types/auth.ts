import { Field, ObjectType } from "type-graphql";
import { UserObjectType } from ".";

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  acesssToken: string;

  @Field(() => UserObjectType)
  user: UserObjectType;
}
