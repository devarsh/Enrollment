import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100vh",
    },
    background:
      "linear-gradient(0deg, rgba(94,231,131,1) 0%, rgba(70,199,165,1) 44%, rgba(33,150,218,1) 100%)",
  },
  loginEmp: {
    background: "#fff",
    padding: theme.spacing(2, 4),
    display: "flex",
    maxWidth: "400px",
    margin: "auto",
    boxShadow: "0 0 20px rgba(0,0,0,0.06)",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  formWrap: {
    marginTop: theme.spacing(2),
  },
  loginBtn: {
    minWidth: "100% !important",
    margin: theme.spacing(2, 0),
    fontSize: "1rem",
    padding: "10px .75rem",
    background:
      "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
    border: 0,
    color: "#fff !important",
    fontWeight: 600,
    letterSpacing: "0.02857em",
    boxShadow: "none",
    textTransform: "capitalize",
    alignSelf: "flex-end",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(94,231,131,1) 0%, rgba(74,204,160,1) 35%, rgba(33,150,218,1) 100%)",
      boxShadow: "none",
    },
  },
  OTPTimer: {
    marginTop: "10px",
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  resendLink: {
    marginTop: "10px",
    cursor: "pointer",
    color: theme.palette.secondary.main,
    fontWeight: 600,
    fontSize: "0.875 rem",
  },
  logo: {
    marginBottom: theme.spacing(1),
  },
  loginLeft: {
    display: "flex",
    justifyContent: "center",
    background:
      "linear-gradient(0deg, rgba(94,231,131,1) 0%, rgba(70,199,165,1) 44%, rgba(33,150,218,1) 100%)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  loginRight: {
    background: "#fff",
    padding: theme.spacing(2, 4),
    display: "flex",
    maxWidth: "400px",
    margin: "auto",
    boxShadow: "0 0 20px rgba(0,0,0,0.06)",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  loginImg: {
    // maxHeight: "40vh",
  },
}));
