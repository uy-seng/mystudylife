import { PayloadAction } from "@reduxjs/toolkit";

export type Pair<T extends object> = {
  [K in keyof T]: { key: K; value: T[K] };
}[keyof T];

export interface BatchParam<T extends object> extends PayloadAction<Pair<T>> {
  payload: Pair<T>;
  type: string;
}

export interface Param<T> {
  payload: T;
  type: string;
}
