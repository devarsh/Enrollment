import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContextType, AuthStateType, ActionType } from "./type";
import { AuthSDK } from "registry/fns/auth";

const inititalState: AuthStateType = {
  token: "",
  tokenType: "",
  isLoggedIn: false,
  user: {
    lastName: "",
    firstName: "",
    lastLogin: "",
    branch: "",
    type: "",
  },
};

const authReducer = (
  state: AuthStateType,
  action: ActionType
): AuthStateType => {
  switch (action.type) {
    case "login": {
      return action.payload;
    }
    case "logout": {
      return {
        token: "",
        tokenType: "",
        isLoggedIn: false,
        user: {
          lastName: "",
          firstName: "",
          lastLogin: "",
          branch: "",
          type: "",
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, inititalState);
  const [authenticating, setAuthenticating] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  //Cannot add location.pathName
  /*eslint-disable react-hooks/exhaustive-deps*/
  const login = useCallback(
    (payload: AuthStateType, stopNavigation?: boolean) => {
      dispatch({
        type: "login",
        payload: { ...payload, isLoggedIn: true },
      });

      localStorage.setItem("authDetails", JSON.stringify(payload));
      if (!Boolean(stopNavigation)) {
        navigate(location.pathname);
      }
    },
    [dispatch, navigate]
  );
  const logout = useCallback(() => {
    localStorage.removeItem("authDetails");
    dispatch({
      type: "logout",
      payload: {},
    });
    navigate("/los");
  }, [dispatch, navigate]);

  const isLoggedIn = () => {
    return state.isLoggedIn;
  };

  window.addEventListener("storage", () => {
    let result = localStorage.getItem("authDetails");
    if (result === null) {
      logout();
    }
  });

  useEffect(() => {
    let result = localStorage.getItem("authDetails");
    if (result !== null) {
      let localStorageAuthState: AuthStateType = JSON.parse(result);
      if (
        Boolean(localStorageAuthState?.token ?? "") &&
        Boolean(localStorageAuthState?.user.type ?? "")
      ) {
        AuthSDK.verifyToken(
          localStorageAuthState.user.type,
          localStorageAuthState.token
        ).then((result) => {
          if (result.status === "success") {
            login(localStorageAuthState, true);
          } else if (result.status === "failure") {
            console.log(result);
            if (result.data instanceof Error) {
              navigate("/error/Internet");
            } else {
              logout();
            }
          }
          setAuthenticating(false);
        });
      } else {
        logout();
        setAuthenticating(false);
      }
    } else {
      logout();
      setAuthenticating(false);
    }
  }, [login, logout, setAuthenticating]);

  return authenticating ? (
    <div>loading...</div>
  ) : (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        authState: state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
