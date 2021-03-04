import { FC } from "react";
import { metaData } from "./metaData";
import { SideBarNav } from "components/navigation/sideBarNavigation";
import "./icons";

export const MySideBar: FC<{
  handleDrawerOpen: Function;
  open: boolean;
}> = ({ handleDrawerOpen, open }) => {
  return (
    <SideBarNav
      metaData={metaData}
      handleDrawerOpen={handleDrawerOpen}
      drawerOpen={open}
    />
  );
};
