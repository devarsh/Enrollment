import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  wrapper: {
    marginTop: "120px",
    minHeight: "calc(100vh - 165px)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
  },
  successImg: {
    maxHeight: "calc(100vh - 400px)",
  },
  prevNextBtn: {
    marginRight: "16px",
    background: "#fff !important",
    height: "48px",
    minWidth: "160px !important",
    fontSize: "1.2rem !important",
    color: "var(--theme-color1) !important",
    border: "1px solid var(--theme-color1) !important",
    borderRadius: "24px",
    "&:hover": {
      color: "var(--theme-color2) !important",
      border: "1px solid  var(--theme-color2) !important",
    },
  },
  continueBtn: {
    background: "#fff !important",
    height: "48px",
    fontSize: "1.2rem !important",
    minWidth: "160px !important",
    color: "var(--theme-color2) !important",
    border: "1px solid  var(--theme-color2) !important",
    borderRadius: "24px",
    "&:hover": {
      color: "var(--theme-color1) !important",
      border: "1px solid var(--theme-color1) !important",
    },
  },
  center: {
    textAlign: "center",
  },
}));
