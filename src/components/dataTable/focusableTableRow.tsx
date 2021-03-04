import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";

export const MyTableRow = withStyles((theme) => {
  return {
    root: {
      "&:focus": {
        outline: "none !important",
        background: theme.palette.action.focus,
      },
      "&$selected:focus": {
        outline: "none !important",
        background: theme.palette.action.focus,
      },
      "&$hover:hover": {
        outline: "none !important",
      },
      "&$selected, &$selected:hover": {
        outline: "none !important",
      },
      "&:hover": {
        outline: "none !important",
        background: theme.palette.action.hover,
      },
    },
    selected: {
      background: theme.palette.action.selected,
    },
  };
})(TableRow);
