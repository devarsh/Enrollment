import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  footerBackground: {
    background:
      "linear-gradient(90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
    display: "flex",
    width: "100%",
    justifyContent: "center",
    padding: "8px 0",
  },
  footerContent: {
    height: "54px",
  },
  textRight: {
    textAlign: "right",
  },
  h3Class: {
    fontWeight: 400,
    fontSize: "1.5rem",
    color: "#fff",
    margin: 0,
  },
  followLinks: {
    maxWidth: "225px",
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
    },
  },
  followLink: {
    width: "37px",
    height: "37px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
