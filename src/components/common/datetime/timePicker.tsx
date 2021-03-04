import { FC, useCallback, useEffect, useRef } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import {
  KeyboardTimePicker,
  KeyboardTimePickerProps,
} from "@material-ui/pickers";
import Grid, { GridProps } from "@material-ui/core/Grid";
import { Omit, Merge } from "../types";
import { parseJSON } from "date-fns";

type KeyboardTimePickerPropsSubset = Omit<
  KeyboardTimePickerProps,
  "onChange" | "value"
>;

interface MyGridExtendedProps {
  GridProps?: GridProps;
  enableGrid: boolean;
}

export type MyTimeTimePickerAllProps = Merge<
  Merge<KeyboardTimePickerPropsSubset, MyGridExtendedProps>,
  UseFieldHookProps
>;

export const MyTimePicker: FC<MyTimeTimePickerAllProps> = ({
  name: fieldName,
  validate,
  validationRun,
  shouldExclude,
  isReadOnly,
  postValidationSetCrossFieldValues,
  runPostValidationHookAlways,
  dependentFields,
  fieldKey: fieldID,
  type,
  GridProps,
  enableGrid,
  //@ts-ignore
  isFieldFocused,
  InputProps,
  inputProps,
  runValidationOnDependentFieldsChange,
  ...others
}) => {
  const {
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    fieldKey,
    name,
    excluded,
    readOnly,
  } = useField({
    name: fieldName,
    fieldKey: fieldID,
    dependentFields,
    validate,
    validationRun,
    runPostValidationHookAlways,
    postValidationSetCrossFieldValues,
    isReadOnly,
    shouldExclude,
    runValidationOnDependentFieldsChange,
  });
  useEffect(() => {
    if (typeof value === "string") {
      let result = parseJSON(value);
      //@ts-ignore
      if (isNaN(result)) {
        result = new Date(value);
      }
      //@ts-ignore
      if (!isNaN(result)) {
        handleChange(result);
      }
    }
  }, [value, handleChange]);
  const focusRef = useRef();
  useEffect(() => {
    if (isFieldFocused) {
      //@ts-ignore
      setTimeout(() => {
        //@ts-ignore
        focusRef?.current?.focus?.();
      }, 1);
    }
  }, [isFieldFocused]);
  const isError = touched && (error ?? "") !== "";
  const customDateChangeHandler = useCallback(
    (date) => {
      handleChange(date);
    },
    [handleChange]
  );
  if (excluded) {
    return null;
  }
  const result = (
    <KeyboardTimePicker
      {...others}
      key={fieldKey}
      id={fieldKey}
      name={name}
      value={value === "" ? null : value} //make sure to pass null when input is empty string
      error={!isSubmitting && isError}
      helperText={!isSubmitting && isError ? error : null}
      onChange={customDateChangeHandler}
      onBlur={handleBlur}
      disabled={isSubmitting}
      InputProps={{
        readOnly: readOnly,
        tabIndex: readOnly ? -1 : undefined,
        ...InputProps,
      }}
      inputProps={{
        tabIndex: readOnly ? -1 : undefined,
        ...inputProps,
      }}
    />
  );
  if (Boolean(enableGrid)) {
    return (
      <Grid {...GridProps} key={fieldKey}>
        {result}
      </Grid>
    );
  } else {
    return result;
  }
};

export default MyTimePicker;
