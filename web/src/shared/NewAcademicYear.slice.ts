import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BatchParam } from "../types";
import { RootState } from "../app/store";
import { formatDate } from "../utils";
import { AcademicYearScheduleType } from "../generated/graphql";

export interface CreateNewAcademicYearGlobalState {
  academicYearPayload: AcademicYearPayload;
  academicYearSchedulePayload: AcademicYearSchedulePayload;
  weekRotationPayload: WeekRotationPayload;
  dayRotationPayload: DayRotationPayload;
  createTermComponentState: {
    active: boolean;
    payload: TermPayload;
    terms: Term[];
  };
}

const currentDate = new Date();

const initialState: CreateNewAcademicYearGlobalState = {
  createTermComponentState: {
    active: false,
    payload: {
      name: "",
      startDate: formatDate(currentDate),
      endDate: formatDate(
        new Date(currentDate.setMonth(currentDate.getMonth() + 1))
      ),
    },
    terms: [],
  },
  academicYearSchedulePayload: {
    type: "fixed",
  },
  academicYearPayload: {
    startDate: "September 06, 2021",
    endDate: "March 06, 2022",
  },
  weekRotationPayload: {
    numOfWeek: 2,
    startWeek: 1,
  },
  dayRotationPayload: {
    numOfDay: 2,
    startDay: 1,
    repeatDays: [],
  },
};

export const NewAcademicYearSlice = createSlice({
  name: "NewAcademicYear",
  initialState,
  reducers: {
    setAcademicYearPayload: (
      state,
      params: BatchParam<AcademicYearPayload>
    ) => {
      state.academicYearPayload[params.payload.key] = params.payload.value;
    },
    setAcademicYearSchedulePayload: (
      state,
      params: BatchParam<AcademicYearSchedulePayload>
    ) => {
      state.academicYearSchedulePayload[params.payload.key] =
        params.payload.value;
    },
    setWeekRotationPayload: (
      state,
      params: BatchParam<WeekRotationPayload>
    ) => {
      state.weekRotationPayload[params.payload.key] = params.payload.value;
    },
    setDayRotationPayload: (state, params: BatchParam<DayRotationPayload>) => {
      switch (params.payload.key) {
        case "numOfDay":
        case "startDay":
          state.dayRotationPayload[params.payload.key] = params.payload.value;
          break;
        case "repeatDays":
          state.dayRotationPayload[params.payload.key] = params.payload.value;
          break;
      }
    },
    setTermPayload: (state, params: BatchParam<TermPayload>) => {
      state.createTermComponentState.payload[params.payload.key] =
        params.payload.value;
    },
    showCreateTermComponent: (state) => {
      state.createTermComponentState.active = true;
    },
    hideCreateTermComponent: (state) => {
      state.createTermComponentState.active = false;
    },
    addNewTerm: (state, newTerm: PayloadAction<Term>) => {
      state.createTermComponentState.terms = [
        ...state.createTermComponentState.terms,
        newTerm.payload,
      ];

      state.createTermComponentState.payload.name = "";
      const endDate = new Date(state.createTermComponentState.payload.endDate);
      const newStartDate = new Date(endDate.setDate(endDate.getDate() + 15));
      state.createTermComponentState.payload.startDate =
        formatDate(newStartDate);
      state.createTermComponentState.payload.endDate = formatDate(
        new Date(newStartDate.setMonth(newStartDate.getMonth() + 1))
      );
    },
    removeTerm: (state, index: PayloadAction<number>) => {
      state.createTermComponentState.terms =
        state.createTermComponentState.terms.filter(
          (_, i) => i !== index.payload
        );
    },
  },
});

export const selectAcademicYearPayload = (state: RootState) =>
  state.newacademicyear.academicYearPayload;
export const selectAcademicYearSchedulePayload = (state: RootState) =>
  state.newacademicyear.academicYearSchedulePayload;
export const selectWeekRotationPayload = (state: RootState) =>
  state.newacademicyear.weekRotationPayload;
export const selectDayRotationPayload = (state: RootState) =>
  state.newacademicyear.dayRotationPayload;
export const selectCreateTermComponentState = (state: RootState) =>
  state.newacademicyear.createTermComponentState;

export const {
  showCreateTermComponent,
  hideCreateTermComponent,
  setAcademicYearPayload,
  setAcademicYearSchedulePayload,
  setTermPayload,
  setDayRotationPayload,
  setWeekRotationPayload,
  addNewTerm,
  removeTerm,
} = NewAcademicYearSlice.actions;

export default NewAcademicYearSlice.reducer;

interface Term {
  name: string;
  startDate: string;
  endDate: string;
}

interface AcademicYearPayload {
  startDate: string;
  endDate: string;
}

interface AcademicYearSchedulePayload {
  type: AcademicYearScheduleType;
}

interface WeekRotationPayload {
  numOfWeek: number;
  startWeek: number;
}

interface DayRotationPayload {
  numOfDay: number;
  startDay: number;
  repeatDays: number[];
}

interface TermPayload {
  name: string;
  startDate: string;
  endDate: string;
}
