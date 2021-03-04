import { useState } from "react";
import { IMaskInput as IMask } from "react-imask";
import TextField from "@material-ui/core/TextField";

function InputMaskCustom({ inputRef, onChange, MaskProps, ...other }) {
  return (
    <IMask
      {...other}
      inputRef={inputRef}
      onAccept={(value, mask) => {
        onChange({
          target: {
            value: mask.unmaskedValue,
          },
        });
      }}
      {...MaskProps}
    />
  );
}

export const EditableMaskInputField = ({
  value: initialValue,
  row: { index, original },
  column: { id, validation, MaskProps },
  updateGridData,
}) => {
  const externalTouched = Boolean(original?._touched?.[id]);
  const externalError = original?._error?.[id] ?? "";
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setLoading(true);
    validation(value).then((result) => {
      setLoading(false);
      updateGridData(index, id, value, true, result);
    });
  };
  return (
    <TextField
      name={id}
      value={value}
      onChange={onChange}
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
        //@ts-ignore
        inputComponent: InputMaskCustom,
        inputProps: { MaskProps: MaskProps },
      }}
      disabled={loading}
    />
  );
};
