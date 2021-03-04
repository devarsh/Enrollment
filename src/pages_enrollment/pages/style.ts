import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    background:
      "linear-gradient(0deg, rgba(94,231,131,1) 0%, rgba(70,199,165,1) 44%, rgba(33,150,218,1) 100%)",
    minHeight: "calc(100vh - 155px)",
    marginTop: "102px",
    paddingBottom: theme.spacing(3),
    alignItems: "center",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 200px)",
    },
  },
  paper: {
    margin: theme.spacing(3, 3, 0, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0 0 20px rgba(0,0,0,0.06)",
    padding: "1rem 0rem",
    borderRadius: 8,
    width: "100%",
    minHeight: "30vh",
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(3, 2, 0, 2),
    },
  },
}));
