import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { useStyles } from "./style";
import ThankYouPage from "./thankyou";
import NotFoundPage from "./notFound";
import EmployeeRegistrationForm from "./employeeRegistration";

const Index = () => {
  const classes = useStyles();
  return (
    <Routes>
      <Route path="/" element={<Redirect />} />
      <Route path="thankyou" element={<ThankYouPage />} />
      <Route
        path="registration"
        element={
          <Box width={1} display="flex" className={classes.wrapper}>
            <div className={classes.paper}>
              <EmployeeRegistrationForm />
            </div>
          </Box>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Index;

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("./registration");
  }, [navigate]);
  return null;
};
