import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  ClassScheduleType,
  GetClassesQuery,
  useGetAcademicYearsQuery
} from "../../../generated/graphql";
import {
  selectToBeUpdatedClassPayload,
  selectToBeUpdatedOneOffSchedulePayload,
  selectToBeUpdatedRepeatSchedules,
  setDefaultToBeUpdatedClassPayload,
  setDefaultToBeUpdatedClassSchedulePayload,
  setDefaultToBeUpdatedOneOffSchedulePayload,
  setDefaultToBeUpdatedRepeatSchedules,
  setToBeUpdatedClassPayload
} from "../../../shared/EditClass.slice";
import { EditClassForm } from "../../forms";
import { HeaderSelect } from "../../select";
import BaseModal from "../BaseModal";
import css from "./EditClass.module.css";

interface Props {
  c: GetClassesQuery["getClasses"][0];
}

export const EditClass: React.FC<Props> = ({ c }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const { data: academicYears } = useGetAcademicYearsQuery();
  const dispatch = useAppDispatch();
  const toBeUpdatedClassPayload = useAppSelector(selectToBeUpdatedClassPayload);
  const toBeUpdatedOneOffSchedulePayload = useAppSelector(
    selectToBeUpdatedOneOffSchedulePayload
  );
  const toBeUpdatedRepeatSchedules = useAppSelector(
    selectToBeUpdatedRepeatSchedules
  );

  React.useEffect(() => {
    // when state when props is valid
    if (c) {
      // update class payload
      dispatch(
        setDefaultToBeUpdatedClassPayload({
          id: c.id,
          academicYearId: c?.academicYear?.id,
          building: c.building,
          module: c.module,
          room: c.room,
          subjectId: c.subject.id,
          teacher: c.teacher,
          termId: c?.term?.id
        })
      );

      // update class schedule payload
      dispatch(
        setDefaultToBeUpdatedClassSchedulePayload({
          id: c.schedule.id,
          type: c.schedule.type as ClassScheduleType
        })
      );

      if (c.schedule.type === "oneOff" && c.schedule.oneOff) {
        dispatch(
          setDefaultToBeUpdatedOneOffSchedulePayload({
            id: c.schedule.oneOff.id,
            date: c.schedule.oneOff.date,
            startTime: c.schedule.oneOff.startTime,
            endTime: c.schedule.oneOff.endTime
          })
        );
      } else if (c.schedule.type === "repeat" && c.schedule.repeat) {
        dispatch(
          setDefaultToBeUpdatedRepeatSchedules(
            c.schedule.repeat.map((r) => {
              return {
                id: r.id,
                days: r.repeatDays,
                endTime: r.endTime,
                startTime: r.startTime,
                rotationWeek: r.rotationWeek as number
              };
            })
          )
        );
      }
    }
  }, [c]);

  if (c && academicYears && toBeUpdatedClassPayload)
    return (
      <React.Fragment>
        <div
          onClick={() => setShow(true)}
          className="edit"
          style={{ top: "1.5rem" }}
        >
          <MdEdit />
        </div>
        <BaseModal
          hide={() => setShow(false)}
          className="editClass"
          parent={document.querySelector(".App") as Element}
          show={show}
        >
          <BaseModal.Header>
            <HeaderSelect
              defaultValue={c.academicYear ? c.academicYear.id : null}
              setState={(value: string) =>
                dispatch(
                  setToBeUpdatedClassPayload({
                    key: "academicYearId",
                    value: value
                  })
                )
              }
              label="Edit Class"
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
            <div
              onClick={() => {
                setShow(false);
              }}
              className="close"
              style={{ top: "2rem" }}
            >
              <AiOutlineClose />
            </div>
          </BaseModal.Header>
          <BaseModal.Body
            style={{
              maxWidth: "550px"
            }}
          >
            {c.schedule.type === "repeat" && (
              <div className={css.reminder}>
                {toBeUpdatedClassPayload?.academicYearId
                  ? `This class will exist in your timetable from ${new Date(
                      academicYears.getAcademicYears.filter(
                        (academicYear) =>
                          academicYear.id ===
                          toBeUpdatedClassPayload.academicYearId
                      )[0].startDate
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric"
                    })} - ${new Date(
                      academicYears.getAcademicYears.filter(
                        (academicYear) =>
                          academicYear.id ===
                          toBeUpdatedClassPayload.academicYearId
                      )[0].endDate
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric"
                    })} unless start/end dates are specified.`
                  : "This class will exist in your timetable indefinitely unless a year/term is set or start/end dates are specified."}
              </div>
            )}
            <EditClassForm setShow={setShow} />
          </BaseModal.Body>
        </BaseModal>
      </React.Fragment>
    );
  return null;
};
