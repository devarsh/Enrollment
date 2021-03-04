import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

export const StyledTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      border: "1px solid #BABABA",
      marginTop: "0 !important",
      borderRadius: 5,
      backgroundColor: "#fff",
      padding: "0 0",
      "& input": {
        padding: "4px 38px 4px 6px",
        marginTop: "0 !important",
        fontSize: "12px",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottom: "0",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #26A456",
      transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottom: "0",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, 1.5px) scale(1)",
    },
    "& .MuiSelect-selectMenu": {
      minHeight: "18px",
      lineHeight: "18px",
      fontSize: 12,
    },
  },
})(TextField);
