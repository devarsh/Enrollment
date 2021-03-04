import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

export const useStyles = makeStyles((theme) => ({
  searchRoot: {
    fontFamily: theme.typography.fontFamily,
    position: "relative",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: 40,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    "& $inputInput": {
      transition: theme.transitions.create("width"),
      width: 120,
      "&:focus": {
        width: 170,
      },
    },
  },
  search: {
    width: theme.spacing(6),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    marginTop: 0,
    borderRadius: "40px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 6),
  },
}));
