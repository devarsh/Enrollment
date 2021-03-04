import { MiscSDK } from "./fns/misc";
import { AuthSDK } from "./fns/auth";
import "./fns/registerFns";
import "./yup";
MiscSDK.inititateAPI(
  `${new URL("./misc/", process.env.REACT_APP_API_URL).href}` ?? ""
);
AuthSDK.inititateAPI(
  `${new URL("./auth/", process.env.REACT_APP_API_URL).href}` ?? ""
);
