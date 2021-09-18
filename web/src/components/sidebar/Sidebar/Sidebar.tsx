import React from "react";
import { useLocation } from "react-router-dom";

import { SidebarMenu } from "../SidebarMenu";
import logo from "../../../assets/msl-icon.svg";
import { SidebarProps } from "../../types/sidebar";

import css from "./Sidebar.module.css";
export const Sidebar: React.FC<SidebarProps> = ({ menu }) => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const current = path[path.length - 1];

  return (
    <div className={css.sidebar}>
      <div>
        <div className={css.logo}>
          <img src={logo} alt="" />
        </div>
        <div>
          {menu.map((m, index) => (
            <SidebarMenu
              pathname={m.pathname}
              active={m.pathname === current}
              key={index}
              icon={m.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};