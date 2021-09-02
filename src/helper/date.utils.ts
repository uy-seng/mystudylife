import { ValueTransformer } from "typeorm";

export const dateTransformer: ValueTransformer = {
  to: (value: Date) => value,
  from: (value: Date) => value.toLocaleDateString(),
};

export const timeTransformer: ValueTransformer = {
  to: (value: Date) => value,
  from: (value: Date) => value.toLocaleTimeString(),
};
