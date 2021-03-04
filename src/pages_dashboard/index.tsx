import { useState, Fragment, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AppBar } from "./appBar";
import { MySideBar } from "./sideBar";
import { Drawer } from "./drawer";
import { Content } from "./content";
import { Dashboard } from "./pages/dashboard";
import { Inquiry } from "./pages/inquiry";
import { Profile } from "./pages/profile";

//import { AuthProvider, AuthLoginController, ProtectedRoutes } from "auth";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useStyles } from "./style";

const DashbordPages = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerState] = useState(true);
  const handleDrawerOpen = () => setDrawerState(true);
  const handleDrawerClose = () => setDrawerState(false);
  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar open={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
        <Drawer open={drawerOpen} handleDrawerClose={handleDrawerClose}>
          <MySideBar handleDrawerOpen={handleDrawerOpen} open={drawerOpen} />
        </Drawer>
        <Content>
          <Routes>
            <Route path="/" element={<RedirectComponent />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/inquiries" element={<Inquiry />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Content>
      </div>
    </Fragment>
  );
};

// const EntryPoint = () => (
//   <Fragment>
//     <AuthProvider>
//       <Routes>
//         <Route
//           path="/*"
//           element={
//             <ProtectedRoutes unauthenticatedRoute="./auth/login/customer">
//               <DashbordPages />
//             </ProtectedRoutes>
//           }
//         />
//         <Route path="/auth/login/:type" element={<AuthLoginController />} />
//       </Routes>
//     </AuthProvider>
//   </Fragment>
// );

export default DashbordPages;

const RedirectComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard");
    } else {
      navigate(location.pathname);
    }
  }, [navigate, location.pathname]);
  return null;
};
