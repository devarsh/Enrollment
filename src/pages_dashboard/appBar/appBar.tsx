import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "assets/images/logo.svg";
import { useStyles } from "./style";
import { AuthContext } from "auth";

export const MyAppBar = ({ handleDrawerOpen, open }) => {
  const authController = useContext(AuthContext);
  const navigate = useNavigate();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        {open !== true ? (
          <img
            src={Logo}
            alt="Ratnaafin"
            className={classes.logo}
            onClick={(e) => {
              e.preventDefault();
              navigate("./");
            }}
          />
        ) : null}

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Dashboard
          <Typography
            variant="caption"
            display="block"
            color="secondary"
            gutterBottom
          >
            Last Login:{" "}
            {checkDateAndDisplay(
              authController?.authState?.user?.lastLogin ?? ""
            )}
          </Typography>
        </Typography>

        <div className={classes.loggedInUser}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.nameClass}
          >
            <span className={classes.userName}>
              {`${authController?.authState?.user?.firstName ?? ""} ${
                authController?.authState?.user?.lastName
              }`}
            </span>
            <ArrowDropDownIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/dashboard/profile");
                handleClose();
              }}
            >
              <AccountCircleIcon color="primary" />
              <span className={classes.vTop}>Profile</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                authController?.logout();
                handleClose();
              }}
            >
              <PowerSettingsNewIcon color="primary" />
              <span className={classes.vTop}>Logout</span>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const checkDateAndDisplay = (dateStr: string) => {
  const dt = new Date(dateStr);
  //@ts-ignore
  if (dt instanceof Date && !isNaN(dt)) {
    return dt.toDateString();
  }
  return "N/A";
};
