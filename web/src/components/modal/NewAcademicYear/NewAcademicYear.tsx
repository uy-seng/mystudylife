import React from "react";
import { NewTerm } from "..";
import { Button } from "../../button";
import { Datepicker } from "../../datepicker";
import BaseModal from "../BaseModal";
import css from "./NewAcademicYear.module.css";
import { Scheduling } from "./Scheduling";

interface Props {}

export const NewAcademicYear: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(true);
  const [activeTab, setActiveTab] = React.useState<string>("scheduling");

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
                <label htmlFor="startDate">Start Date</label>
                <div id="startDate">
                  <Datepicker />
                </div>
              </div>
              <div>
                <label htmlFor="endDate">End Date</label>
                <div id="endDate">
                  <Datepicker />
                </div>
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
          <div>
            <div>What Are Academic Years?</div>
            <div
              style={{
                maxWidth: "500px",
              }}
            >
              An academic year and its terms are used to represent your school
              year and any terms (eg. semesters, trimesters, quarters) that you
              may have.
            </div>
          </div>
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
