import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export const WelcomeText1 = withStyles((theme) => ({
  root: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: "1.2",
    color: theme.palette.secondary.main,
    fontFamily: '"Montserrat", Helvetica, Arial, Lucida, sans-serif',
  },
}))(Typography);

export const WelcomeText2 = withStyles((theme) => ({
  root: {
    fontSize: "13px",
    fontWeight: 500,
    color: theme.palette.secondary.main,
  },
}))(Typography);

export const CardTitle = withStyles((theme) => ({
  root: {
    fontSize: "1.2rem",
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
}))(Typography);

export const CardValue = withStyles((theme) => ({
  root: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: theme.palette.secondary.main,
  },
}))(Typography);
