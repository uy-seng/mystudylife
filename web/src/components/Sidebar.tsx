import React from "react";
import { SidebarMenuProps } from "./types/sidebar";
import logo from "../assets/msl-icon.svg";
import css from "./Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";

interface Props {
  menu: SidebarMenuProps[];
}

export const Sidebar: React.FC<Props> = ({ menu }) => {
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

const SidebarMenu: React.FC<SidebarMenuProps> = ({
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
