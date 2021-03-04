import { useReducer, useContext } from "react";
import Box from "@material-ui/core/Box";
import { AuthSDK } from "registry/fns/auth";
import { useParams, useNavigate } from "react-router-dom";
import loginImg from "assets/images/login.svg";
import { useStyles } from "./style";
import { UsernameField } from "./username";
import { PasswordField } from "./password";
import { AuthContext } from "./authContext";

const inititalState = {
  username: "",
  password: "",
  loading: false,
  isError: false,
  userMessage: "",
  currentFlow: "username",
  transactionID: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setUsername": {
      return { ...state, username: action.payload.data };
    }
    case "setPassword": {
      return { ...state, password: action.payload.data };
    }
    case "inititateUserNameVerification":
    case "inititatePasswordVerification": {
      return { ...state, loading: true, isError: false, userMessage: "" };
    }
    case "passwordVerificationFailure":
    case "usernameVerificationFailure": {
      return {
        ...state,
        loading: false,
        isError: true,
        userMessage: action.payload.error,
      };
    }
    case "usernameVerificationSuccessful": {
      return {
        ...state,
        loading: false,
        currentFlow: "password",
        transactionID: action.payload.transactionID,
      };
    }
    case "passwordVerificationSuccessful": {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
};

export const AuthLoginController = () => {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  const [loginState, dispath] = useReducer(reducer, inititalState);
  const loginType = params["type"];

  //redirect the user to LOS if already logged in
  if (authContext?.isLoggedIn()) {
    setTimeout(() => navigate("/los"), 1);
    return null;
  }

  if (["customer", "employee"].indexOf(loginType) < 0) {
    setTimeout(() => navigate("/crm", { replace: true }), 1);
    return null;
  }

  const verifyUsername = async () => {
    if (!Boolean(loginState.username)) {
      dispath({
        type: "usernameVerificationFailure",
        payload: { error: "This is a required" },
      });
      return;
    }
    dispath({ type: "inititateUserNameVerification" });
    try {
      const result = await AuthSDK.veirfyUsername(
        loginState.username,
        loginType
      );
      if (result.status === "success") {
        dispath({
          type: "usernameVerificationSuccessful",
          payload: { transactionID: result?.data?.transactionId },
        });
      } else {
        dispath({
          type: "usernameVerificationFailure",
          payload: {
            error: result?.data?.error_msg ?? "Unknown error occured",
          },
        });
      }
    } catch (e) {
      dispath({
        type: "usernameVerificationFailure",
        payload: {
          error: e?.message ?? "Unknown error occured",
        },
      });
    }
  };

  const verifyPassword = async () => {
    if (!Boolean(loginState.password)) {
      dispath({
        type: "passwordVerificationFailure",
        payload: { error: "This is a required Field" },
      });
      return;
    }
    dispath({ type: "inititatePasswordVerification" });
    try {
      const result = await AuthSDK.verifyPasswordAndLogin(
        loginState.transactionID,
        loginState.username,
        loginState.password,
        loginType
      );
      if (result.status === "success") {
        dispath({ type: "passwordVerificationSuccessful" });
        authContext?.login(result.data);
      } else {
        dispath({
          type: "passwordVerificationFailure",
          payload: {
            error: result?.data?.error_msg ?? "Unknown error occured",
          },
        });
      }
    } catch (e) {
      dispath({
        type: "passwordVerificationFailure",
        payload: {
          error: e?.message ?? "Unknown error occured",
        },
      });
    }
  };

  const handleUsername = (e) => {
    dispath({
      type: "setUsername",
      payload: { data: e.target.value },
    });
  };
  const handlePassword = (e) => {
    dispath({
      type: "setPassword",
      payload: { data: e.target.value },
    });
  };

  return (
    <Box display="flex" width={1} className={classes.wrapper}>
      <Box
        display="flex"
        flexDirection="column"
        width={1 / 2}
        className={classes.loginLeft}
      >
        <img alt="" src={loginImg} className={classes.loginImg} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width={1 / 2}
        className={classes.loginRight}
      >
        {loginState.currentFlow === "username" ? (
          <UsernameField
            loginType={loginType}
            classes={classes}
            loginState={loginState}
            verifyUsername={verifyUsername}
            handleUsername={handleUsername}
          />
        ) : (
          <PasswordField
            loginType={loginType}
            classes={classes}
            loginState={loginState}
            verifyPassword={verifyPassword}
            handlePassword={handlePassword}
          />
        )}
      </Box>
    </Box>
  );
};
