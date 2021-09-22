import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { MeQuery, useMeQuery } from "../generated/graphql";

interface Props extends RouteProps {
  data: MeQuery | undefined;
}

export const PublicRoute: React.FC<Props> = ({
  component,
  path,
  exact,
  data,
}) => {
  if (data) return <Redirect to="/dashboard" />;

  return <Route exact={exact} path={path} component={component} />;
};
