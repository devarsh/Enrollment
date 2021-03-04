import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles";

const StyledTabs = withStyles({
  root: {
    border: "1px solid #e8e8e8",
    background: "#fff",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  indicator: {
    background:
      "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",

    top: 0,
  },
})(Tabs);

export default StyledTabs;
