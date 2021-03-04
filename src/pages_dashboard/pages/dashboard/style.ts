import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 160,
  },
  fixedHeightChart: {
    height: 240,
  },
  cardTitle: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
  },
  cardContent: {
    padding: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(0, 0, 1, 0),
  },
  icon: {
    color: theme.palette.primary.main,
    "& svg": {
      fontSize: "40px",
      height: "40px",
      fontWeight: 400,
    },
  },
  status: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    "& h6": {
      padding: theme.spacing(1),
    },
  },
  statusText: {
    fontWeight: 600,
    textAlign: "center",
    fontSize: "13px",
    [theme.breakpoints.down("md")]: {
      fontSize: "11px",
      padding: theme.spacing(0.5),
    },
  },
  pending: {
    color: "#f1c232",
  },
  rejected: {
    color: "#cc0000",
  },
  confirmed: {
    color: theme.palette.secondary.main,
  },
  pendingBg: {
    backgroundColor: "#f1c232",
  },
  rejectedBg: {
    backgroundColor: "#cc0000",
  },
  confirmedBg: {
    backgroundColor: theme.palette.secondary.main,
  },
  hot: {
    color: "#db3001",
  },
  warm: {
    color: "#f58f14",
  },
  cold: {
    color: "#68b6ca",
  },
  hotBg: {
    backgroundColor: "#db3001",
  },
  warmBg: {
    backgroundColor: "#f58f14",
  },
  coldBg: {
    backgroundColor: "#68b6ca",
  },
  unit: {
    fontSize: "10px",
    color: "#fff",
    padding: theme.spacing(0.5),
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2px auto 4px",
  },
}));
