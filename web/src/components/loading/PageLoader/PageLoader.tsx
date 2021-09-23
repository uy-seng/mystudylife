import React from "react";
// import logo from "../../../assets/msl-icon.svg";

import css from "./PageLoader.module.css";
interface Props {}

export const PageLoader: React.FC<Props> = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "var(--primary)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "100px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className={css.dotFalling} />
        </div>
      </div>
    </div>
  );
};
