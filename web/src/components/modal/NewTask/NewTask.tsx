import React from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../../../app/hooks";
import { useGetAcademicYearsQuery } from "../../../generated/graphql";
import { setTaskPayload } from "../../../shared/NewTask.slice";
import { IconButton } from "../../button";
import { NewTaskForm } from "../../forms/NewTask";
import { HeaderSelect } from "../../select";
import BaseModal from "../BaseModal";

interface Props {}

export const NewTask: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const { data: academicYears } = useGetAcademicYearsQuery();
  const dispatch = useAppDispatch();

  if (academicYears)
    return (
      <React.Fragment>
        <IconButton
          type="button"
          style={{
            backgroundColor: "var(--primary)",
            color: "white",
          }}
          onClick={() => setShow(true)}
          icon={<AiOutlinePlus />}
          text={"New Task"}
        />
        <BaseModal
          parent={document.querySelector(".App") as Element}
          show={show}
        >
          <BaseModal.Header>
            <HeaderSelect
              defaultValue={null}
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
          <BaseModal.Body>
            <NewTaskForm setShow={setShow} />
          </BaseModal.Body>
        </BaseModal>
      </React.Fragment>
    );
  else return null;
};
