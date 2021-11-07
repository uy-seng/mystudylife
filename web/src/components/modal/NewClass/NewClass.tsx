import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ManageSubject, NewSubject } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  useGetAcademicYearsQuery,
  useGetSubjectsQuery,
} from "../../../generated/graphql";
import {
  selectClassPayload,
  selectClassSchedulePayload,
  setClassPayload,
  setClassPayloadToDefault,
  setClassSchedulePayloadToDefault,
  setOneOffSchedulePayloadToDefault,
  setRepeatSchedulesToDefault,
} from "../../../shared/NewClass.slice";
import { selectScheduleComponentState } from "../../../shared/Schedule.slice";
import { Button } from "../../button";
import { NewClassForm } from "../../forms";
import { HeaderSelect } from "../../select";
import BaseModal from "../BaseModal";
import { IoIosAlert } from "react-icons/io";

import css from "./NewClass.module.css";
interface Props {}

export const NewClass: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const { data: academicYears } = useGetAcademicYearsQuery();
  const { academicYearId } = useAppSelector(selectClassPayload);
  const dispatch = useAppDispatch();
  const { type: classScheduleType } = useAppSelector(
    selectClassSchedulePayload
  );
  const { data: subjects, loading: fetchingSubject } = useGetSubjectsQuery();

  const { selectedYear } = useAppSelector(selectScheduleComponentState);

  const close = () => {
    dispatch(setClassPayloadToDefault());
    dispatch(setClassSchedulePayloadToDefault());
    dispatch(setOneOffSchedulePayloadToDefault());
    dispatch(setRepeatSchedulesToDefault());
    setShow(false);
  };

  React.useEffect(() => {
    if (selectedYear) {
      dispatch(
        setClassPayload({
          key: "academicYearId",
          value: selectedYear.id,
        })
      );
    }
  }, [selectedYear]);

  if (academicYears && subjects)
    return (
      <React.Fragment>
        <Button
          style={{
            padding: "0.5rem",
          }}
          as="primary"
          text={`New Class`}
          onClick={() => setShow(true)}
        />
        <BaseModal
          hide={close}
          className="newClass"
          parent={document.querySelector(".App") as Element}
          show={show}
        >
          <BaseModal.Header>
            {subjects.getSubjects.length === 0 && (
              <div className={css.alert}>
                <IoIosAlert />
                Empty Subject
              </div>
            )}
            {subjects.getSubjects.length > 0 && (
              <HeaderSelect
                defaultValue={academicYearId}
                setState={(value: string) =>
                  dispatch(
                    setClassPayload({
                      key: "academicYearId",
                      value: value,
                    })
                  )
                }
                label="New Class"
                data={[
                  {
                    key: "None",
                    value: null,
                    label: "No year/term",
                  },
                  ...academicYears.getAcademicYears.map((academicYear) => {
                    return {
                      key: `${academicYear.startDate.split("-")[0]} - ${
                        academicYear.endDate.split("-")[0]
                      }`,
                      label: `${academicYear.startDate.split("-")[0]} - ${
                        academicYear.endDate.split("-")[0]
                      }`,
                      value: academicYear.id,
                    };
                  }),
                ]}
              />
            )}
            <div
              onClick={close}
              className="close"
              style={{
                top: subjects.getSubjects.length > 0 ? "2rem" : "1rem",
              }}
            >
              <AiOutlineClose />
            </div>
          </BaseModal.Header>
          <BaseModal.Body
            style={{
              maxWidth: "550px",
            }}
          >
            {subjects.getSubjects.filter(
              (subject) => subject.academicYear?.id === academicYearId
            ).length > 0 && (
              <React.Fragment>
                {classScheduleType === "repeat" && (
                  <div className={css.reminder}>
                    {academicYearId
                      ? `This class will exist in your timetable from ${new Date(
                          academicYears.getAcademicYears.filter(
                            (academicYear) => academicYear.id === academicYearId
                          )[0].startDate
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })} - ${new Date(
                          academicYears.getAcademicYears.filter(
                            (academicYear) => academicYear.id === academicYearId
                          )[0].endDate
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })} unless start/end dates are specified.`
                      : "This class will exist in your timetable indefinitely unless a year/term is set or start/end dates are specified."}
                  </div>
                )}
                <NewClassForm setShow={setShow} />
              </React.Fragment>
            )}
            {subjects.getSubjects.filter(
              (subject) => subject.academicYear?.id === academicYearId
            ).length === 0 && (
              <>
                <div>
                  <span className="txt-sm">
                    You have't create any subject{" "}
                    {subjects.getSubjects.length > 0
                      ? " for this academic year "
                      : ""}
                    yet,&nbsp;
                  </span>
                  <NewSubject controller="link" />
                </div>
              </>
            )}
          </BaseModal.Body>
        </BaseModal>
      </React.Fragment>
    );
  return null;
};
