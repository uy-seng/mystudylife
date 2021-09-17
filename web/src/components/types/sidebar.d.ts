export interface SidebarMenuProps {
  icon: React.ReactNode;
  active?: boolean;
  pathname: string;
}

export interface SidebarProps {
  menu: SidebarMenuProps[];
}
