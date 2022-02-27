import { MeQuery } from "../../generated/graphql";

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  active?: boolean;
  pathname: string;
}

export interface SidebarProps {
  menu: SidebarMenuProps[];
  userName?: string;
}
