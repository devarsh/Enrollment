import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./authContext";

export const ProtectedRoutes = ({ children, unauthenticatedRoute }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (!(authContext !== null && authContext.isLoggedIn())) {
      navigate(unauthenticatedRoute ?? "/los/auth/login/customer");
    }
  }, []);
  if (authContext !== null && authContext.isLoggedIn()) {
    return children;
  }
  return null;
};
