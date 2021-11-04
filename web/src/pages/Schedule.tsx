import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import {
  EditAcademicYear,
  ManageSubject,
  NewAcademicYear,
  NewClass,
  ViewClass,
} from "../components/modal";
import {
  GetAcademicYearsQuery,
  useGetAcademicYearsQuery,
  useGetClassesQuery,
} from "../generated/graphql";

import css from "./Schedule.module.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectScheduleComponentState,
  setScheduleComponentState,
} from "../shared/Schedule.slice";
import { formatTime } from "../utils";

interface Props {}

export const Schedule: React.FC<Props> = () => {
  const { data, loading } = useGetAcademicYearsQuery();
  const { selectedYear } = useAppSelector(selectScheduleComponentState);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (data)
      dispatch(
        setScheduleComponentState({
          key: "academicYears",
          value: data.getAcademicYears,
        })
      );
  }, [data]);

  return (
    <div className={css.content}>
      <header className={css.header}>
        <h2 className={css.title + " txt-lg"}>Schedule</h2>
        <div>
          <ManageSubject />
          {selectedYear && <EditAcademicYear />}
          <NewAcademicYear />
        </div>
      </header>
      <div className={css.body}>
        {data && data!.getAcademicYears.length > 0 ? (
          <ScheduleListing schedules={data.getAcademicYears} />
        ) : (
          !loading && <EmptySchedule />
        )}
      </div>
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
  var { data: classesQueryResult } = useGetClassesQuery();
  const [classes, setClasses] = React.useState<any[]>([]);

  React.useEffect(() => {
    dispatch(
      setScheduleComponentState({
        key: "selectedYear",
        value: schedules[0],
      })
    );
  }, []);

  React.useEffect(() => {
    if (classesQueryResult) setClasses([...classesQueryResult?.getClasses]);
  }, [classesQueryResult]);

  React.useEffect(() => {
    if (classes && classesQueryResult) {
      setClasses([
        ...classesQueryResult?.getClasses.filter(
          (c) =>
            c.academicYear?.id === selectedYear?.id || c.academicYear === null
        ),
      ]);
    }
  }, [selectedYear, classesQueryResult]);

  if (classes)
    return (
      <div className={css.scheduleListing}>
        <div>
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              onClick={() =>
                dispatch(
                  setScheduleComponentState({
                    key: "selectedYear",
                    value: schedule,
                  })
                )
              }
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
        <div>
          <div>
            <div className="txt-md">Classes</div>
            <NewClass />
          </div>
          <div className={css.classListing}>
            {classes.map((c) => (
              <ViewClass
                data={c}
                childController={
                  <div className={css.class}>
                    <div>
                      <div className="txt-md">{`${c.subject.name} ${
                        c.module ? `: ${c.module}` : ``
                      }`}</div>
                      <div className="txt-sm">{c.teacher}</div>
                    </div>
                    {c.schedule.type === "oneOff" && (
                      <div className="txt-sm txt-thin">{`${formatTime(
                        c.schedule.oneOff?.startTime
                      )} - ${formatTime(c.schedule.oneOff?.endTime)}`}</div>
                    )}
                    {c.schedule.type === "repeat" &&
                      c.schedule.repeat.map((r: any) => (
                        <div className="txt-sm txt-thin">
                          {`${formatTime(r.startTime)} - ${formatTime(
                            r.endTime
                          )} ${r.repeatDays.join(",")}`}
                        </div>
                      ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
        <div></div>
      </div>
    );
  else return null;
};
