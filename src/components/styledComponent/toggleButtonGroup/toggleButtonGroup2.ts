import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { withStyles } from "@material-ui/core/styles";

export const StyledToggleButtonGroup2 = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    color: "#393939",
    "&:selected": {
      color: theme.palette.primary.main,
    },
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);
