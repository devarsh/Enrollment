import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  title: {
    color: "#26A456",
    letterSpacing: "2px",
    fontSize: "1.75rem",
    fontWeight: 700,
    alignSelf: "flex-start",
    marginBottom: "10px",
  },
  subTitle: {
    color: "#26A456",
    letterSpacing: "2px",
    fontSize: "1.25rem",
    fontWeight: 700,
    alignSelf: "flex-start",
    marginBottom: theme.spacing(2),
  },
  label: {
    color: "#736f6f",
    fontWeight: 600,
    textTransform: "capitalize",
    fontSize: "1rem",
    marginBottom: "0.5 rem",
  },
  form: {
    width: "100%",
  },
  tabsSubmitBtn: {
    boxShadow: "none ",
    background: "#e0e0e0",
    marginRight: theme.spacing(2),
    color: "#0b6fb8 ",
    fontSize: "1.2rem",
    "&:hover": {
      color: "#e0e0e0 ",
      background:
        "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
      boxShadow: "none ",
    },
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "1.2rem",
    borderRadius: "24px",
  },
  backBtn: {
    boxShadow: "none ",
    background: "#e0e0e0",
    marginRight: theme.spacing(2),
    color: "#0b6fb8 ",
    margin: theme.spacing(3, 0, 2),
    fontSize: "1.2rem",
    borderRadius: "24px",
    "&:hover": {
      color: "#e0e0e0 ",
      background:
        "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
      boxShadow: "none ",
    },
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonWrapper: {
    position: "relative",
  },
}));
