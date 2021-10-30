import React from "react";
import { GetClassesQuery } from "../../../generated/graphql";

interface Props {
  c: GetClassesQuery["getClasses"][0];
}

export const EditClass: React.FC<Props> = ({ c }) => {
  return <div></div>;
};
