import Backdrop from "@material-ui/core/Backdrop";
import { withStyles } from "@material-ui/core/styles";

export const CustomBackdrop = withStyles(() => ({
  root: {
    position: "absolute",
    zIndex: 9,
    backgroundColor: "rgb(0 0 0 / 0%)",
  },
}))(Backdrop);
