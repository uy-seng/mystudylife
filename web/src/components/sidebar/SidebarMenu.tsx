import React from "react";
import { Link } from "react-router-dom";
import { SidebarMenuProps } from "../types/sidebar";
import css from "./SidebarMenu.module.css";

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  icon,
  active,
  pathname,
}) => {
  return (
    <Link
      to={`/${pathname}`}
      className={active ? [css.menu, css.active].join(" ") : css.menu}
    >
      <div>
        <div>{icon}</div>
      </div>
    </Link>
  );
};
