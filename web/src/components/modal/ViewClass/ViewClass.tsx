import React from "react";
import { GetClassesQuery } from "../../../generated/graphql";
import { Button } from "../../button";
import BaseModal from "../BaseModal";
import { HiLocationMarker } from "react-icons/hi";
import { GiTeacher } from "react-icons/gi";
import css from "./ViewClass.module.css";
import moment from "moment";
import ctx from "classnames";
import { AiOutlineClose } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { BsCalendar } from "react-icons/bs";
import { formatDate, formatTime } from "../../../utils";
import { DeleteClass, EditClass } from "..";

interface Props {
  childController: React.ReactNode;
  data?: GetClassesQuery["getClasses"][0];
}

export const ViewClass: React.FC<Props> = ({ childController, data }) => {
  const [show, setShow] = React.useState(false);

  if (data)
    return (
      <React.Fragment>
        {childController ? (
          <div onClick={() => setShow(true)}>{childController}</div>
        ) : (
          <Button
            as="neutral"
            text={`View Class`}
            onClick={() => setShow(true)}
          />
        )}

        <BaseModal
          hide={() => setShow(false)}
          className="viewClass"
          parent={document.querySelector(".App") as Element}
          show={show}
        >
          <BaseModal.Header>
            <BaseModal.Title
              style={{
                fontSize: "20px",
                maxWidth: "300px",
              }}
            >{`${data?.subject.name}: ${data?.module} Class`}</BaseModal.Title>
            <BaseModal.Extra>
              {data.academicYear
                ? `${data?.academicYear?.startDate.split("-")[0]}-${
                    data?.academicYear?.endDate.split("-")[0]
                  }`
                : `No year/term`}
            </BaseModal.Extra>

            <DeleteClass
              classId={data!.id}
              closeParent={() => setShow(false)}
              parentClassName={"viewClass"}
            />
            <EditClass c={data} />
            <div
              onClick={() => {
                setShow(false);
              }}
              className="close"
              style={{ top: "1.5rem" }}
            >
              <AiOutlineClose />
            </div>
          </BaseModal.Header>
          <BaseModal.Body style={{ padding: "1.5rem" }}>
            <div className={css.detail}>
              {data?.schedule.oneOff && (
                <div className={css.row}>
                  <div>
                    <BsCalendar />
                  </div>
                  <div>
                    {`${formatTime(
                      data.schedule.oneOff.startTime
                    )} - ${formatTime(data.schedule.oneOff.endTime)} --${
                      formatDate(new Date(data.schedule.oneOff.date)) ===
                      formatDate(new Date())
                        ? " Today"
                        : ` ${formatDate(new Date(data.schedule.oneOff.date))}`
                    }`}
                  </div>
                </div>
              )}
              <div className={css.row}>
                <div>
                  <HiLocationMarker />
                </div>
                <div>{data?.room}</div>
              </div>
              <div className={css.row}>
                <div>
                  <GiTeacher />
                </div>
                <div>{data?.teacher || "Not specified"}</div>
              </div>
              {/* //! need to fix for multiple repeat schedule render in the same week */}
              {data?.schedule.repeat &&
                data.schedule.repeat.map((d) => (
                  <div className={css.rotationWeek}>
                    <div className={ctx(css.weekNumber, css.levelOne)}>
                      <span>{`Week ${d.rotationWeek}`}</span>
                      <div />
                    </div>
                    <div className={ctx(css.weekDetail, css.levelTwo)}>
                      <div>{d.repeatDays.join(", ")}</div>
                      <div>
                        {`${formatTime(d.startTime)} - ${formatTime(
                          d.endTime
                        )}`}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </BaseModal.Body>
        </BaseModal>
      </React.Fragment>
    );
  else return null;
};
