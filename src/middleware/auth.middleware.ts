import { AuthenticationError } from "apollo-server-errors";
import { verify } from "jsonwebtoken";
import { Context } from "../interface";
import { MiddlewareFn } from "type-graphql";
import { UserPayload } from "../interface/auth.d";

export const authenticationGate: MiddlewareFn<Context> = (
  { context },
  next
) => {
  if (!context.req.headers.authorization)
    throw new AuthenticationError("user is not authenticated");
  const accessToken = context.req.headers.authorization.split(" ")[1];
  try {
    const decodedPayload = verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    );
    context.payload = decodedPayload as UserPayload;
  } catch (e) {
    throw new AuthenticationError(e.message);
  }
  return next();
};
