import { AuthenticationError } from "apollo-server-errors";

import { verify } from "jsonwebtoken";
import { User } from "src/entity";
import { UserPayload } from "src/graphql/resolvers/auth/types";
import { Context } from "src/interface";
import { MiddlewareFn } from "type-graphql";
import { getConnection } from "typeorm";

export const authenticationGate: MiddlewareFn<Context> = async (
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
    ) as any;
    context.user = decodedPayload.user as UserPayload;
    const userRepository = getConnection(process.env.NODE_ENV).getRepository(
      User
    );
    const user = await userRepository.findOne(decodedPayload.user!.id);
    if (user?.tokenVersion !== decodedPayload!.user!.tokenVersion)
      throw new AuthenticationError("user session has expired");
  } catch (e) {
    throw new AuthenticationError(e.message);
  }
  return next();
};
