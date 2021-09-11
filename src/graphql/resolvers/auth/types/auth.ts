import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  accessToken: string;
}
