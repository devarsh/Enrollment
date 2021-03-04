import { TextField } from "components/styledComponent/textfield";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export const PasswordField = ({
  loginType,
  classes,
  loginState,
  verifyPassword,
  handlePassword,
}) => {
  return (
    <>
      <div className={classes.formWrap}>
        <TextField
          label={loginType === "customer" ? "OTP" : "Password"}
          placeholder="Enter verification detail"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          type={loginType === "customer" ? "number" : "password"}
          name="otp"
          value={loginState?.password ?? ""}
          onChange={handlePassword}
          error={loginState.isError}
          helperText={loginState.isError ? loginState.userMessage : ""}
        />
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            endIcon={loginState.loading ? <CircularProgress size={20} /> : null}
            disabled={loginState.loading}
            onClick={verifyPassword}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};
