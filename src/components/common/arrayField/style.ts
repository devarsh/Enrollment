import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  arrayRowContainer: {
    position: "relative",
    boxShadow: theme.shadows[3],
    marginBottom: theme.spacing(3),
  },
  arrayRowRemoveBtn: {
    position: "absolute",
    top: -22,
    right: -22,
    color: "#f50057",
  },
  arrayRowCard: {
    width: "100%",
    position: "relative",
    overflow: "auto",
  },
  arrayRowCardContent: {
    paddingLeft: "32px",
  },
}));
