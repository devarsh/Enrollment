import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    marginRight: theme.spacing(4),
    opacity: 1,
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontFamily: [
      "Montserrat",
      "Helvetica",
      "Arial",
      "Lucida",
      "sans-serif",
    ].join(","),
    "&:hover": {
      color: "#0063a3",
      opacity: 1,
    },
    "&$selected": {
      color: "#fff",
      fontWeight: "600",
      background:
        "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
    },
    "&:focus": {
      color: "#fff",
    },
  },
  selected: {},
}))(Tab);

export default StyledTab;
