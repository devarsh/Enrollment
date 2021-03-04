import { useState, useCallback } from "react";
import { TextField, TextFieldProps } from "components/common/textField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

const PasswordField: React.FC<TextFieldProps> = ({ ...others }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleVisibility = useCallback(() => {
    setPasswordVisibility((old) => !old);
  }, [setPasswordVisibility]);
  return (
    <TextField
      {...others}
      type={passwordVisibility ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleVisibility}
              edge="end"
              tabIndex={-1}
            >
              {passwordVisibility ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
