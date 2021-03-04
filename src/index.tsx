import ReactDOM from "react-dom";
import { StrictMode, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import CssBaseline from "@material-ui/core/CssBaseline";
import EnrollmentSite from "app/enrollment";
import Dashboard from "app/dashboard";
import "typeface-roboto";
import "registry";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import * as serviceWorker from "./serviceWorker";
require("dotenv").config();

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("enrollment/");
  }, [navigate]);
  return null;
};

const App = () => (
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <RecoilRoot>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/enrollment/*" element={<EnrollmentSite />} />
            <Route path="*" element={<Redirect />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </DndProvider>
  </StrictMode>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
