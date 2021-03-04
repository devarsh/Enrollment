import { FC, useCallback, useState } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import FormLabel, { FormLabelProps } from "@material-ui/core/FormLabel";
import FormGroup, { FormGroupProps } from "@material-ui/core/FormGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@material-ui/core/FormControlLabel";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import Switch, { SwitchProps } from "@material-ui/core/Switch";
import FormHelperText, {
  FormHelperTextProps,
} from "@material-ui/core/FormHelperText";
import Grid, { GridProps } from "@material-ui/core/Grid";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Merge, OptionsProps } from "../types";
import { getLabelFromValues, useOptionsFetcher } from "../utils";

interface extendedFiledProps extends UseFieldHookProps {
  options: OptionsProps[];
  _optionsKey?: string;
  disableCaching?: boolean;
  label: string;
}

type MySwitchMixedProps = Merge<SwitchProps, extendedFiledProps>;

interface MySwitchExtendedProps {
  FormLabelProps?: FormLabelProps;
  FormGroupProps?: FormGroupProps;
  FormControlLabelProps?: FormControlLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  GridProps?: GridProps;
  enableGrid: boolean;
  CircularProgressProps?: CircularProgressProps;
}

export type MySwitchGroupAllProps = Merge<
  MySwitchMixedProps,
  MySwitchExtendedProps
>;

const valueExists = (myValue: any[] | any, value: any) => {
  return Array.isArray(myValue) && myValue.indexOf(value) > -1;
};

const MyCheckboxGroup: FC<MySwitchGroupAllProps> = ({
  name: fieldName,
  validate,
  validationRun,
  shouldExclude,
  isReadOnly,
  postValidationSetCrossFieldValues,
  runValidationOnDependentFieldsChange,
  runPostValidationHookAlways,
  dependentFields,
  fieldKey: fieldID,
  label,
  options,
  FormControlProps,
  FormLabelProps,
  FormGroupProps,
  FormHelperTextProps,
  FormControlLabelProps,
  GridProps,
  enableGrid,
  CircularProgressProps,
  _optionsKey,
  disableCaching,
  ...others
}) => {
  const {
    formState,
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
    dependentValues,
    incomingMessage,
    runValidation,
    whenToRunValidation,
    setIncomingMessage,
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
  const [_options, setOptions] = useState<OptionsProps[]>([]);
  const getLabelFromValuesForOptions = useCallback(
    (values) => getLabelFromValues(_options)(values),
    [_options]
  );

  const handleChangeInterceptor = useCallback(
    (e) => {
      const value = typeof e === "object" ? e?.target?.value ?? "" : e;
      let result = getLabelFromValuesForOptions(value);
      handleChange(e, result[0] as any);
    },
    [handleChange, getLabelFromValuesForOptions]
  );
  const { loadingOptions } = useOptionsFetcher(
    formState,
    options,
    setOptions,
    handleChangeInterceptor,
    dependentValues,
    incomingMessage,
    runValidation,
    whenToRunValidation,
    _optionsKey,
    disableCaching,
    setIncomingMessage
  );

  if (excluded) {
    return null;
  }
  const isError = touched && (error ?? "") !== "";
  const switches = _options.map((oneSwitch) => (
    <FormControlLabel
      {...FormControlLabelProps}
      control={
        <Switch
          {...others}
          readOnly={readOnly}
          tabIndex={readOnly ? -1 : undefined}
        />
      }
      key={oneSwitch.value}
      name={name}
      onChange={handleChangeInterceptor}
      label={oneSwitch.label}
      value={oneSwitch.value}
      checked={valueExists(value, oneSwitch.value)}
    />
  ));
  const result = (
    // @ts-ignore
    <FormControl
      {...FormControlProps}
      key={fieldKey}
      component="fieldset"
      disabled={isSubmitting}
      error={!isSubmitting && isError}
      onBlur={handleBlur}
    >
      <FormLabel {...FormLabelProps} component="label">
        {label}
      </FormLabel>
      <FormGroup {...FormGroupProps}>
        {loadingOptions ? (
          <InputAdornment position="end">
            <CircularProgress
              color="primary"
              variant="indeterminate"
              {...CircularProgressProps}
            />
          </InputAdornment>
        ) : (
          switches
        )}
      </FormGroup>
      {!isSubmitting && isError ? (
        <FormHelperText {...FormHelperTextProps}>{error}</FormHelperText>
      ) : null}
    </FormControl>
  );

  if (Boolean(enableGrid)) {
    return <Grid {...GridProps}>{result}</Grid>;
  } else {
    return result;
  }
};

export default MyCheckboxGroup;
