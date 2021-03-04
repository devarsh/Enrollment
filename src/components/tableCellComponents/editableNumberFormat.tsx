import { useState } from "react";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";

function NumberFormatCustom(props) {
  const { inputRef, onChange, FormatProps, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange(
          {
            target: {
              name: props.name,
              value: values.value,
              formattedValue: values.formattedValue,
            },
          },
          values.formattedValue
        );
      }}
      {...FormatProps}
    />
  );
}

export const EditableNumberFormat = ({
  value: initialValue,
  row: { index, original },
  column: { id, validation, FormatProps },
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
        inputComponent: NumberFormatCustom,
        inputProps: { FormatProps: FormatProps },
      }}
      disabled={loading}
    />
  );
};
