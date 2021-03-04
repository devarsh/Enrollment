import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    "& .MuiCheckbox-root": {
      padding: "2px 6px",
    },
    "& label": {
      marginBottom: 0,
    },
  },
}))(MenuItem);
