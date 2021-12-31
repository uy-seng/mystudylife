import React from "react";
import { NewTask } from "../components/modal";
import { HeaderSelect } from "../components/select";
import {
  useGetAcademicYearsQuery,
  useGetTasksQuery
} from "../generated/graphql";
import css from "./ManageTask.module.css";
import ctx from "classnames";

interface Props {}

export const ManageTask: React.FC<Props> = () => {
  const { data: academicYears } = useGetAcademicYearsQuery();
  const [selectedAcademicYearId, setSelectedAcademicYearId] =
    React.useState<String | null>(null);
  const { data: tasks } = useGetTasksQuery();

  React.useEffect(() => {
    if (academicYears && academicYears.getAcademicYears.length > 0) {
      setSelectedAcademicYearId(academicYears.getAcademicYears[0].id);
    }
  }, [academicYears]);

  if (academicYears && tasks)
    return (
      <div className={css.managetask}>
        <div
          className="title"
          style={{
            borderBottom: "1px solid #cdd4d4",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            fontWeight: 400,
            paddingBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <HeaderSelect
            classNames={css.header}
            defaultValue={selectedAcademicYearId}
            setState={(value: string) => setSelectedAcademicYearId(value)}
            label="Task"
            data={[
              {
                key: "None",
                value: null,
                label: "No year/term"
              },
              ...academicYears.getAcademicYears.map((academicYear) => {
                return {
                  key: `${academicYear.startDate.split("-")[0]} - ${
                    academicYear.endDate.split("-")[0]
                  }`,
                  label: `${academicYear.startDate.split("-")[0]} - ${
                    academicYear.endDate.split("-")[0]
                  }`,
                  value: academicYear.id
                };
              })
            ]}
          />
          <NewTask parentClass={css.newtask} />
        </div>
        <div className={css.body}>
          <div className={css.left}>
            <div className={css.query}>
              <div className={css.left}></div>
              <div className={css.right}></div>
            </div>
            <div className={css.result}>
              {tasks.getTasks
                .filter((task) => {
                  return (
                    task?.academicYear?.id === selectedAcademicYearId ||
                    !task?.academicYear?.id
                  );
                })
                .map((task) => (
                  <div>{task.title}</div>
                ))}
            </div>
          </div>
          <div className={ctx(css.newtask, css.right)}>
            <NewTask parentClass={css.newtask} />
          </div>
        </div>
      </div>
    );
  return null;
};
