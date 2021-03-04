import { FC, useEffect, useRef, useCallback } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "@material-ui/core/TextareaAutosize";

import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

import Grid, { GridProps } from "@material-ui/core/Grid";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import { Merge } from "../types";

interface MyGridExtendedProps {
  maxLength?: number;
  GridProps?: GridProps;
  StartAdornment?: string;
  EndAdornment?: string;
  CircularProgressProps?: CircularProgressProps;
  enableGrid: boolean;
  label: string;
}

type MyTextareaAutosizeAllProps = Merge<
  TextareaAutosizeProps,
  MyGridExtendedProps
>;

export type MyTextareaAutosizeFieldProps = UseFieldHookProps &
  MyTextareaAutosizeAllProps;

const MyTextareaAutosize: FC<MyTextareaAutosizeFieldProps> = ({
  name: fieldName,
  validate,
  validationRun,
  postValidationSetCrossFieldValues,
  runValidationOnDependentFieldsChange,
  runPostValidationHookAlways,
  shouldExclude,
  isReadOnly,
  dependentFields,
  fieldKey: fieldID,
  GridProps,
  CircularProgressProps,
  enableGrid,
  StartAdornment,
  EndAdornment,
  //@ts-ignore
  isFieldFocused,
  maxLength = -1,
  label,
  ...others
}) => {
  const {
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    validationRunning,
    fieldKey,
    name,
    excluded,
    readOnly,
    incomingMessage,
    whenToRunValidation,
    runValidation,
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

  const customHandleChange = useCallback(
    (e) => {
      handleChange(e, e.target?.formattedValue ?? undefined);
    },
    [handleChange]
  );

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

  useEffect(() => {
    if (incomingMessage !== null && typeof incomingMessage === "object") {
      const { value } = incomingMessage;
      if (value !== "DEFAULT_VALUE") {
        handleChange(value);
      }
      if (whenToRunValidation === "onBlur") {
        runValidation({ value: value }, true);
      }
    }
  }, [incomingMessage, handleChange, runValidation, whenToRunValidation]);

  if (excluded) {
    return null;
  }
  let myError = error;

  let myTouch = touched;

  const isError = myTouch && Boolean(myError);

  const result = (
    <FormControl disabled={isSubmitting}>
      <InputLabel>{label}</InputLabel>
      <TextareaAutosize
        {...others}
        key={fieldKey}
        id={fieldKey}
        name={name}
        value={value}
        //@ts-ignore
        InputProps={{
          endAdornment: validationRunning ? (
            <InputAdornment position="end">
              <CircularProgress
                color="primary"
                variant="indeterminate"
                {...CircularProgressProps}
              />
            </InputAdornment>
          ) : Boolean(EndAdornment) ? (
            EndAdornment
          ) : null,
          startAdornment: Boolean(StartAdornment) ? (
            <InputAdornment position="start">{StartAdornment}</InputAdornment>
          ) : null,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        inputRef={focusRef}
        onChange={(e) => {
          if (maxLength === -1) {
            customHandleChange(e);
          } else if (e.target.value.length <= maxLength) {
            customHandleChange(e);
          }
        }}
        inputProps={{
          readOnly: readOnly,
          tabIndex: readOnly ? -1 : undefined,
        }}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
      <FormHelperText>{isError ? error : ""}</FormHelperText>
    </FormControl>
  );
  if (Boolean(enableGrid)) {
    return <Grid {...GridProps}>{result}</Grid>;
  } else {
    return result;
  }
};

export default MyTextareaAutosize;
