import { withStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";

export const StickyTableHead = withStyles(() => ({
  root: {
    position: "sticky",
    zIndex: 10,
    top: 0,
    backgroundColor: "white",
    display: "block",
  },
}))(TableHead);
