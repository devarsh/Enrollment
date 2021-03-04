import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import SuccessImg from "assets/images/success.svg";
import { useStyles } from "./style";

export const ThankYou = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box
      className={classes.wrapper}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <img alt="" src={SuccessImg} className={classes.successImg} />
      <Box className={classes.center} mt={3} mb={3}>
        <h3 className="theme-color2">
          <b>Thank you for contacting us!</b>
        </h3>
        We have received your request.<br></br>
        We will contact you soon!
      </Box>
      <Box
        className="links"
        display="flex"
        justifyContent="center"
        flexDirection="row"
        mb={3}
      >
        <Button
          className={classes.prevNextBtn}
          onClick={(e) => {
            e.preventDefault();
            navigate("/crm");
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};
