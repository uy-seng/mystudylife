import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  accessToken: string;
}

export interface UserPayload {
  id: string;
  email: string | null;
  username: string;
  provider: string | null;
  tokenVersion: number;
}
