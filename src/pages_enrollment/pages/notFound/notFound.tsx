import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SuccessImg from "assets/images/success.svg";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./style";

export const NotFoundPage = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  return (
    <Box
      className={classes.wrapper}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <img alt="" src={SuccessImg} className={classes.failureImg} />
      <Box className={classes.center} mt={3} mb={3}>
        <h3 className="theme-color2">
          <b>Sorry we couldnt find the page you were looking for.</b>
        </h3>
      </Box>
      <Box
        className="links"
        display="flex"
        justifyContent="center"
        flexDirection="row"
        mb={3}
      >
        <Button
          className={classes.continueBtn}
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Return to Home Page
        </Button>
      </Box>
    </Box>
  );
};
