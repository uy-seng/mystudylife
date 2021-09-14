import React from "react";
import { NewTerm } from "..";
import { useAppSelector } from "../../../app/hooks";
import { selectAcademicYearComponentRefreshCounter } from "../../../shared/NewAcademicYear.slice";
import { Button } from "../../button";
import { Datepicker } from "../../datepicker";
import BaseModal from "../BaseModal";
import css from "./NewAcademicYear.module.css";
import { Scheduling } from "./Scheduling";

interface Props {}

export const NewAcademicYear: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<string>("scheduling");
  const refreshCounter = useAppSelector(
    selectAcademicYearComponentRefreshCounter
  );

  React.useEffect(() => {
    console.log("rerendered");
  }, [refreshCounter]);

  return (
    <React.Fragment>
      <Button
        as="primary"
        text="New Academic Year"
        onClick={() => setShow(true)}
      />
      <BaseModal
        className="newAcademicYear"
        parent={document.querySelector(".App") as Element}
        show={show}
      >
        <BaseModal.Header>
          <BaseModal.Title>New Academic Year</BaseModal.Title>
          <BaseModal.Extra>2020/2021</BaseModal.Extra>
        </BaseModal.Header>
        <BaseModal.Body>
          <div>
            <div className={css.academicYearPayload}>
              <div>
                <Datepicker rerender={refreshCounter} label="Start Date" />
              </div>
              <div>
                <Datepicker rerender={refreshCounter} label="End Date" />
              </div>
            </div>
            <div
              style={{
                marginTop: "2rem",
              }}
            >
              <div className={css.tabs}>
                <div
                  onClick={(e) => {
                    if (activeTab !== "scheduling") setActiveTab("scheduling");
                  }}
                  className={
                    activeTab === "scheduling" ? css.active : undefined
                  }
                >
                  Scheduling
                </div>
                <div
                  onClick={(e) => {
                    if (activeTab !== "term") setActiveTab("term");
                  }}
                  className={activeTab === "term" ? css.active : undefined}
                >
                  Terms
                </div>
              </div>
              <div className={css.tabContent}>
                {activeTab === "scheduling" && <Scheduling />}
                {activeTab === "term" && <NewTerm />}
              </div>
            </div>
          </div>
          <div className={css.textGroup}>
            <div className="txt-md">What Are Academic Years?</div>
            <div
              className="txt-sm"
              style={{
                maxWidth: "500px",
              }}
            >
              An academic year and its terms are used to represent your school
              year and any terms (eg. semesters, trimesters, quarters) that you
              may have.
            </div>
          </div>
          <div className={css.actionBtnGroup}>
            <Button onClick={() => setShow(false)} as="neutral" text="Cancel" />
            <Button as="primary" text="Save" />
          </div>
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
