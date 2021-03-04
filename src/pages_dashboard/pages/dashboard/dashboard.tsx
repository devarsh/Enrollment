/* eslint-disable */
import { Fragment } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import GroupIcon from "@material-ui/icons/Group";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import {
  ConstructionFinanceIcon,
  RetailHomeLoanIcon,
  HealthInsuranceIcon,
  LiabilityInsuranceIcon,
} from "assets/icons/productIcons";
import { useStyles } from "./style";
import { WelcomeText1, WelcomeText2, CardTitle, CardValue } from "./variants";

const data = [
  {
    title: "Inquiries",
    num: "5,000",
    icon: <LiveHelpIcon />,
    informationBlocks: [
      { label: "Pending", value: "1500", status: "pending" },
      { label: "Rejected", value: "500", status: "rejected" },
      { label: "Confirmed", value: "3000", status: "confirmed" },
    ],
  },
  {
    title: "All Leads",
    num: "3,000",
    icon: <DataUsageIcon />,
    informationBlocks: [
      { label: "Hot", value: "1500", status: "hot" },
      { label: "Warm", value: "500", status: "warm" },
      { label: "Cold", value: "1000", status: "cold" },
    ],
  },
  {
    title: "BD Leads",
    num: "800",
    icon: ConstructionFinanceIcon,
    informationBlocks: [
      { label: "Hot", value: "500", status: "hot" },
      { label: "Warm", value: "200", status: "warm" },
      { label: "Cold", value: "100", status: "cold" },
    ],
  },
  {
    title: "Retail Leads",
    num: "1,000",
    icon: RetailHomeLoanIcon,
    informationBlocks: [
      { label: "Hot", value: "500", status: "hot" },
      { label: "Warm", value: "300", status: "warm" },
      { label: "Cold", value: "200", status: "cold" },
    ],
  },
  {
    title: "Unsecured Leads",
    num: "600",
    icon: LiabilityInsuranceIcon,
    informationBlocks: [
      { label: "Hot", value: "300", status: "hot" },
      { label: "Warm", value: "100", status: "warm" },
      { label: "Cold", value: "200", status: "cold" },
    ],
  },
  {
    title: "Insurance Leads",
    num: "400",
    icon: HealthInsuranceIcon,
    informationBlocks: [
      { label: "Hot", value: "100", status: "hot" },
      { label: "Warm", value: "200", status: "warm" },
      { label: "Cold", value: "100", status: "cold" },
    ],
  },
  {
    title: "Customers",
    num: "400",
    icon: <GroupIcon />,
  },
  {
    title: "Partners",
    num: "400",
    icon: <GroupWorkIcon />,
  },
];

const DashLet = () => {
  const classes = useStyles();
  return (
    <Fragment>
      {data.map((val, index) => {
        return (
          <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
            <Card>
              <CardContent className={classes.cardContent}>
                <div className={classes.content}>
                  <div>
                    <CardTitle variant="h3">{val.title}</CardTitle>
                    <CardValue variant="h4">{val.num}</CardValue>
                  </div>
                  <div className={classes.icon}>{val.icon}</div>
                </div>
                <div className={classes.status}>
                  {val?.informationBlocks?.map((block, index) => {
                    let statusClass = "";
                    let statusBgClass = "";
                    block.status === "confirmed"
                      ? ((statusClass = classes.confirmed),
                        (statusBgClass = classes.confirmedBg))
                      : block.status === "pending"
                      ? ((statusClass = classes.pending),
                        (statusBgClass = classes.pendingBg))
                      : block.status === "rejected"
                      ? ((statusClass = classes.rejected),
                        (statusBgClass = classes.rejectedBg))
                      : block.status === "hot"
                      ? ((statusClass = classes.hot),
                        (statusBgClass = classes.hotBg))
                      : block.status === "warm"
                      ? ((statusClass = classes.warm),
                        (statusBgClass = classes.warmBg))
                      : block.status === "cold"
                      ? ((statusClass = classes.cold),
                        (statusBgClass = classes.coldBg))
                      : "";
                    const currentClass = clsx(statusClass, classes.statusText);
                    const currentBgClass = clsx(classes.unit, statusBgClass);
                    return (
                      <Fragment key={index}>
                        <Typography
                          variant="subtitle2"
                          className={currentClass}
                        >
                          <span className={currentBgClass}>{block.value}</span>
                          {block.label}
                        </Typography>
                      </Fragment>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Fragment>
  );
};

export const Dashboard = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <WelcomeText1>Welcome Employee,</WelcomeText1>
          <WelcomeText2>This is your Ratnaafin account.</WelcomeText2>
        </Paper>
      </Grid>

      <DashLet key="dashlet" />
    </Grid>
  );
};
