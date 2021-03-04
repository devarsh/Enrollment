import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  navBarCSS: {
    padding: "4px 1rem ",
    backgroundColor: "#fff !important",
    minHeight: "64px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
  },
  font13: {
    fontSize: "13px",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#fff",
    color: "#0063A3",
  },

  logo: {
    height: "50px",
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: 0,
  },
  menuButtonHidden: {
    display: "none",
  },
}));
