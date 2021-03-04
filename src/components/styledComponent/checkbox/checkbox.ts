import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

const StyledCheckbox = withStyles({
  root: {
    color: "#0063A3",
    alignSelf: "flex-start",
    padding: '0 9px',
    "&$checked": {
      color: "#26A456",
    },
  },
  checked: {},
})(Checkbox);

export default StyledCheckbox;
