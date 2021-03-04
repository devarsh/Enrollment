import TextField from "@material-ui/core/TextField";

import { withStyles } from "@material-ui/core/styles";

const StyledTextField = withStyles({
  // root: {
  //   "& label": {
  //     color: "#736f6f",
  //     fontWeight: "600",
  //     textTransform: "capitalize",
  //     fontSize: "1rem",
  //     marginBottom: "0.5 rem",
  //   },
  //   "& label.Mui-focused": {
  //     color: "#26A456",
  //   },
  //   "& .MuiInputBase-root": {
  //     border: "1px solid #BABABA",
  //     marginTop: "26px",
  //     borderRadius: 5,
  //     backgroundColor: "#fff",
  //     padding: "0 0 0 1rem",
  //     "& input": {
  //       padding: "6px 0 7px ",
  //     },
  //   },
  //   "& .MuiInput-underline:before": {
  //     borderBottom: "0",
  //   },
  //   "& .MuiInput-underline:after": {
  //     borderBottom: "2px solid #3f51b5",
  //     transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  //   },
  //   "&:hover .MuiInput-underline:before": {
  //     borderBottom: "0",
  //   },
  //   "& .MuiInputLabel-shrink": {
  //     transform: "translate(0, 1.5px) scale(1)",
  //   },
  //   "& .MuiToggleButton": {
  //     borderColor: "#8C8C8C",
  //     transition: "border 0.3s ease-in",
  //     borderRadius: "8px",
  //     color: "red",
  //     backgroundColor: "red",
  //     height: "400px !imortant",
  //   },
  // },
})(TextField);

export default StyledTextField;
