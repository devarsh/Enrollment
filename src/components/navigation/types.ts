import { useStylesBootstrapNav } from "./style";

export type hrefTarget = "_blank" | "_parent" | "_self" | "_top";

export interface NavItemType {
  label: string;
  href?: string;
  isRouterLink?: boolean;
  rel?: string;
  target?: hrefTarget;
  children?: NavItemType[];
  navigationProps?: any;
  icon?: any;
  iconPosition?: "before" | "after";
}

export interface NavBarMetaDataType {
  config: {
    rel: string;
    target: hrefTarget;
  };
  navItems: NavItemType[];
}

export interface NestedNavItemProps {
  item: NavItemType;
  classes: ReturnType<typeof useStylesBootstrapNav>;
  direction?: string;
}

export interface NavRendererType {
  metaData: NavBarMetaDataType;
}

export interface SideBarRendererType {
  metaData: NavBarMetaDataType;
  handleDrawerOpen: Function;
  drawerOpen: boolean;
}
