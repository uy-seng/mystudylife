import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import GuestPageReducer from "../shared/Guest.slice";
import NewAcademicYearReducer from "../shared/NewAcademicYear.slice";
import ScheduleReducer from "../shared/Schedule.slice";
import NewSubjectReducer from "../shared/NewSubject.slice";
import NewClassReducer from "../shared/NewClass.slice";
import EditClassReducer from "../shared/EditClass.slice";
import EditSubjectReducer from "../shared/EditSubject.slice";
import NewTaskReducer from "../shared/NewTask.slice";
import NewHolidayReducer from "../shared/NewHoliday.slice";
import EditHolidayReducer from "../shared/EditHoliday.slice";

export const store = configureStore({
  reducer: {
    guestpage: GuestPageReducer,
    newacademicyear: NewAcademicYearReducer,
    schedule: ScheduleReducer,
    newsubject: NewSubjectReducer,
    newclass: NewClassReducer,
    editclass: EditClassReducer,
    editsubject: EditSubjectReducer,
    newtask: NewTaskReducer,
    newholiday: NewHolidayReducer,
    editholiday: EditHolidayReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
