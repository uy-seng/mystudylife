import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { ManageSubject, NewAcademicYear } from "../components/modal";
import {
  GetAcademicYearsQuery,
  useGetAcademicYearsQuery,
} from "../generated/graphql";

import { ScheduleLoader } from "./components/schedule";

import css from "./Schedule.module.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectScheduleComponentState,
  setScheduleComponentState,
} from "../shared/Schedule.slice";

interface Props {}

export const Schedule: React.FC<Props> = () => {
  const { data, loading } = useGetAcademicYearsQuery();

  return (
    <div className={css.content}>
      <header className={css.header}>
        <h2 className={css.title + " txt-lg"}>Schedule</h2>
        <div>
          <ManageSubject />
          <NewAcademicYear />
        </div>
      </header>
      <div className={css.body}>
        {data && data!.getAcademicYears.length > 0 ? (
          <ScheduleListing schedules={data.getAcademicYears} />
        ) : (
          <EmptySchedule />
        )}
      </div>
      {loading ? <ScheduleLoader /> : null}
    </div>
  );
};

const EmptySchedule: React.FC = () => {
  return (
    <div className={css.emptySchedule}>
      <div className={css.emptyScheduleContent}>
        <div className={css.emptyScheduleIcon}>
          <AiOutlineCalendar />
        </div>
        <div className="txt-lg">Add Your Schedule</div>
        <div className="txt-sm">
          This is where your years, terms, classes and holidays will live. Add
          an academic year to get started
        </div>
        <div>
          <NewAcademicYear />
        </div>
      </div>
    </div>
  );
};

interface ScheduleListingProps {
  schedules: GetAcademicYearsQuery["getAcademicYears"];
}

const ScheduleListing: React.FC<ScheduleListingProps> = ({ schedules }) => {
  const dispatch = useAppDispatch();
  const { selectedYear } = useAppSelector(selectScheduleComponentState);

  React.useEffect(() => {
    dispatch(
      setScheduleComponentState({
        key: "selectedYear",
        value: schedules[0],
      })
    );
  }, []);
  return (
    <div className={css.scheduleListing}>
      <div>
        {schedules.map((schedule) => (
          <div
            className={
              selectedYear?.id === schedule.id ? css.active : undefined
            }
          >
            <div className="txt-md">
              {schedule.startDate.split("-")[0]}
              {" - "}
              {schedule.endDate.split("-")[0]}
            </div>
            <div className="txt-xs">
              {new Date(schedule.startDate)
                .toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .split(",")
                .join("")}
              {" - "}
              {new Date(schedule.endDate)
                .toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .split(",")
                .join("")}
            </div>
          </div>
        ))}
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
