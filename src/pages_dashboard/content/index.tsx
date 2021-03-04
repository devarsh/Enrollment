import Container from "@material-ui/core/Container";
import { useStyles } from "./style";
import ScrollBar from "react-perfect-scrollbar";

export const Content = ({ children }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <ScrollBar>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>{children}</Container>
      </ScrollBar>
    </main>
  );
};
