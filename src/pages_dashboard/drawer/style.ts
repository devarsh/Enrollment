import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 250;

export const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(6),
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    zIndex: 9999,
    height: "70px",
    ...theme.mixins.toolbar,
  },
  hrCSS: {
    zIndex: 9999,
  },
  logo: {
    height: "50px",
  },
  buttonLink: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
    display: "inline",
    margin: 0,
    padding: 0,
    "&:focus": {
      textDecoration: "none",
    },
    "$:hover": {
      textDecoration: "none",
    },
  },
}));

/*
  
*/
