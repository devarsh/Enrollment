import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState, useEffect, useRef } from "react";

export const EditableTextField = ({
  value: initialValue,
  row: { index, original },
  column: { id, validation, isPassword },
  updateGridData,
}) => {
  const externalTouched = Boolean(original?._touched?.[id]);
  const externalError = original?._error?.[id] ?? "";
  const isPasswordFieldRef = useRef(Boolean(isPassword));
  const [inputType, setInputType] = useState(
    Boolean(isPassword) ? "password" : "text"
  );
  const toggleInputType = () =>
    setInputType((old) => (old === "password" ? "text" : "password"));
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    setLoading(true);
    validation(value).then((result) => {
      setLoading(false);
      updateGridData(index, id, value, true, result);
    });
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <TextField
      name={id}
      value={value}
      onChange={onChange}
      type={inputType}
      onBlur={onBlur}
      InputLabelProps={{ shrink: true }}
      size="small"
      fullWidth
      margin="none"
      error={Boolean(externalTouched) && Boolean(externalError)}
      helperText={
        Boolean(externalTouched) && Boolean(externalError)
          ? externalError
          : null
      }
      InputProps={{
        endAdornment: isPasswordFieldRef.current ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleInputType}
              onMouseDown={handleMouseDownPassword}
            >
              {inputType === "password" ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ) : null,
        style: { marginTop: "0px" },
      }}
      disabled={loading}
    />
  );
};
