import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    overflow: "hidden",
    display: "block",
    height: 4,
    zIndex: 0,
    "@media print": {
      colorAdjust: "exact",
    },
  },
}));

export const LinearProgressBarSpacer = () => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};
