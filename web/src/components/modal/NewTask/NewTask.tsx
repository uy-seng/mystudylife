import React from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useGetAcademicYearsQuery } from "../../../generated/graphql";
import {
  selectTaskPayload,
  setTaskPayload,
} from "../../../shared/NewTask.slice";
import { IconButton } from "../../button";
import { NewTaskForm } from "../../forms/NewTask";
import { HeaderSelect } from "../../select";
import BaseModal from "../BaseModal";

interface Props {
  parentClass?: string;
}

export const NewTask: React.FC<Props> = ({ parentClass }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const { data: academicYears } = useGetAcademicYearsQuery();
  const dispatch = useAppDispatch();
  const taskPayload = useAppSelector(selectTaskPayload);
  const parent = parentClass
    ? document.querySelector(`.${parentClass}`)
    : document.querySelector(".App");

  React.useEffect(() => {
    if (academicYears)
      dispatch(
        setTaskPayload({
          key: "academicYearId",
          value: academicYears?.getAcademicYears[0]?.id || undefined,
        })
      );
  }, [academicYears]);

  if (academicYears)
    return (
      <React.Fragment>
        <IconButton
          type="button"
          style={{
            backgroundColor: "var(--primary)",
            color: "white",
            width: "max-content",
            height: "max-content",
          }}
          onClick={() => setShow(true)}
          icon={<AiOutlinePlus />}
          text={"New Task"}
        />
        <BaseModal
          className="newtask"
          parent={parent as Element}
          hide={() => setShow(false)}
          show={show}
        >
          <BaseModal.Header>
            <HeaderSelect
              defaultValue={taskPayload.academicYearId || null}
              setState={(value: string) => {
                dispatch(
                  setTaskPayload({
                    key: "academicYearId",
                    value: value,
                  })
                );
              }}
              label="New Task"
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
            <div
              onClick={() => {
                setShow(false);
              }}
              className="close"
              style={{
                top: "2rem",
              }}
            >
              <AiOutlineClose />
            </div>
          </BaseModal.Header>
          <BaseModal.Body
            style={{
              maxHeight: "550px",
              overflowY: "scroll",
            }}
          >
            <NewTaskForm setShow={setShow} />
          </BaseModal.Body>
        </BaseModal>
      </React.Fragment>
    );
  else return null;
};
