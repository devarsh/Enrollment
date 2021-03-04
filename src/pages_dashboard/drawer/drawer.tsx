import { useNavigate } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Logo from "assets/images/logo.svg";

import { useStyles } from "./style";

export const MyDrawer = ({ open, handleDrawerClose, children }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <img
          src={Logo}
          alt="Ratnaafin"
          className={classes.logo}
          onClick={(e) => {
            e.preventDefault();
            navigate("./");
          }}
        />
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider className={classes.hrCSS} />
      {children}
    </Drawer>
  );
};
