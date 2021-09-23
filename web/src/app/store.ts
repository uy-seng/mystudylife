import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import GuestPageReducer from "../shared/Guest.slice";
import NewAcademicYearReducer from "../shared/NewAcademicYear.slice";
import ScheduleReducer from "../shared/Schedule.slice";
import NewSubjectReducer from "../shared/NewSubject.slice";

export const store = configureStore({
  reducer: {
    guestpage: GuestPageReducer,
    newacademicyear: NewAcademicYearReducer,
    schedule: ScheduleReducer,
    newsubject: NewSubjectReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
