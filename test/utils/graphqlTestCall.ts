import { CookieOptions } from "express";
import { graphql } from "graphql";
import { buildSchema, Maybe } from "type-graphql";
import { AuthResolver } from "../../src/graphql/resolvers/auth.resolver";
import { AcademicYearResolver } from "../../src/graphql/resolvers/academicYear.resolver";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let accessToken: string | undefined;
export const setAccessToken = (value: string | undefined) => {
  accessToken = value;
};

export const getAccessToken = () => {
  return accessToken;
};

export const gqlTest = async ({ source, variableValues }: Options) => {
  const schema = await buildSchema({
    resolvers: [AuthResolver, AcademicYearResolver],
  });
  return graphql({
    schema: schema,
    source: source,
    variableValues: variableValues,
    contextValue: {
      req: {
        headers: {
          authorization: accessToken ? `Bearer ${accessToken}` : null,
        },
      },
      res: {
        cookie: (key: string, value: string, options: CookieOptions) => {},
      },
    },
  });
};
