import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { withStyles } from "@material-ui/core/styles";

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderColor: "#8C8C8C",
    transition: "border 0.3s ease-in",
    borderRadius: "8px",
    textTransform: "capitalize",
    color: "#727272",
    padding: "4px 10px",
    //@ts-ignore
    fontWeight: 700,
    "&:not(:first-child)": {
      borderRadius: "8px",
      borderLeft: "1px solid #8C8C8C",
    },
    "&:first-child": {
      borderRadius: "8px",
    },
    "&.Mui-selected": {
      border: "1px solid #57D3C3",
      background:
        "linear-gradient(0deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 10%, rgba(33,150,218,1) 100%)",
      color: "white",
    },
    "& label": {
      color: "#736f6f",
      fontWeight: "600",
      textTransform: "capitalize",
      fontSize: "1rem",
      marginBottom: "0.5 rem",
    },
    "& .MuiSvgIcon-root": {
      maxHeight: "20px",
    },
  },
}))(ToggleButtonGroup);

export default StyledToggleButtonGroup;
