import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class UserPayloadGQL {
  @Field()
  id: string;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  provider: string | null;

  @Field(() => Int)
  tokenVersion: number;
}

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  acesssToken: string;

  @Field()
  user: UserPayloadGQL;
}
