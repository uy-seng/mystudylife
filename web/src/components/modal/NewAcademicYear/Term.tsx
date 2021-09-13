import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectCreateTermComponentState,
  setTermPayload,
  setAcademicYearPayload,
  hideCreateTermComponent,
  addNewTerm,
  removeTerm,
  showCreateTermComponent,
} from "../../../shared/NewAcademicYear.slice";

interface Props {}

export const Term: React.FC<Props> = () => {
  const { active, payload, terms } = useAppSelector(
    selectCreateTermComponentState
  );
  const dispatch = useAppDispatch();
  return (
    <div>
      {active ? (
        <div>
          <div style={{ display: "flex" }}>
            <label htmlFor="name">Name</label>
            <input
              value={payload.name}
              onChange={(e) =>
                dispatch(
                  setTermPayload({
                    key: "name",
                    value: e.currentTarget.value,
                  })
                )
              }
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div>
            <div>
              <label htmlFor="startDate">Start Date</label>
              <input
                value={payload.startDate}
                onChange={(e) =>
                  dispatch(
                    setTermPayload({
                      key: "startDate",
                      value: e.currentTarget.value,
                    })
                  )
                }
                type="text"
                name="startDate"
                id="startDate"
              />
            </div>
            <div>
              <label htmlFor="endDate">Start Date</label>
              <input
                value={payload.endDate}
                onChange={(e) =>
                  dispatch(
                    setAcademicYearPayload({
                      key: "endDate",
                      value: e.currentTarget.value,
                    })
                  )
                }
                type="text"
                name="endDate"
                id="endDate"
              />
            </div>
            <div style={{ display: "flex", marginTop: "0.5rem" }}>
              <button
                onClick={() => dispatch(hideCreateTermComponent())}
                style={{
                  width: "100%",
                  backgroundColor: "cornflowerblue",
                  color: "white",
                  padding: "0.5rem",
                  marginRight: "0.5rem",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(addNewTerm(payload));
                  dispatch(hideCreateTermComponent());
                }}
                style={{
                  width: "100%",
                  backgroundColor: "cornflowerblue",
                  color: "white",
                  padding: "0.5rem",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            {terms.map((term, index) => (
              <div style={{ display: "flex", marginBottom: "0.5rem" }}>
                <div>
                  <div>{term.name}</div>
                  <div>
                    {term.startDate} - {term.endDate}
                  </div>
                </div>
                <button
                  style={{
                    backgroundColor: "cornflowerblue",
                    color: "white",
                    padding: "0.5rem",
                  }}
                  onClick={() => {
                    dispatch(removeTerm(index));
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              dispatch(showCreateTermComponent());
            }}
            style={{
              width: "100%",
              backgroundColor: "cornflowerblue",
              color: "white",
              padding: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            New term
          </button>
        </div>
      )}
    </div>
  );
};
